// Primo Singularity Map - CSV Import Component
// Upload CSV, map columns, and validate data

'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Papa from 'papaparse';
import { usePrimoStore } from '@/store/primoStore';
import {
  CloseIcon,
  UploadIcon,
  ChevronDownIcon,
} from '@/brand/icons';
import {
  Facility,
  FacilityCounts,
  parseFacilityType,
  parseStatus,
  validateFacility,
} from '@/types/primo';
import { cn } from '@/lib/utils';

// Column mapping interface
interface ColumnMapping {
  csvColumn: string;
  schemaField: string;
}

// Schema fields that can be mapped
const SCHEMA_FIELDS = [
  { key: 'id', label: 'ID', required: false },
  { key: 'name', label: 'Name', required: true },
  { key: 'brand', label: 'Brand', required: false },
  { key: 'facilityType', label: 'Facility Type', required: false },
  { key: 'status', label: 'Status', required: false },
  { key: 'address', label: 'Address', required: false },
  { key: 'city', label: 'City', required: true },
  { key: 'state', label: 'State', required: true },
  { key: 'lat', label: 'Latitude', required: true },
  { key: 'lon', label: 'Longitude', required: true },
  { key: 'trucks', label: 'Trucks', required: false },
  { key: 'trailers', label: 'Trailers', required: false },
  { key: 'guardShacks', label: 'Guard Shacks', required: false },
  { key: 'gates', label: 'Gates', required: false },
  { key: 'trailerYards', label: 'Trailer Yards', required: false },
  { key: 'dropDocks', label: 'Drop Docks', required: false },
  { key: 'inboundLanes', label: 'Inbound Lanes', required: false },
  { key: 'outboundLanes', label: 'Outbound Lanes', required: false },
  { key: 'notes', label: 'Notes', required: false },
];

// Column mapping dropdown
interface MappingSelectProps {
  csvColumn: string;
  selectedField: string;
  onSelect: (field: string) => void;
  usedFields: string[];
}

const MappingSelect: React.FC<MappingSelectProps> = ({
  csvColumn,
  selectedField,
  onSelect,
  usedFields,
}) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <span className="text-sm font-mono" style={{ color: theme.colors.text }}>
        {csvColumn}
      </span>
      <select
        value={selectedField}
        onChange={(e) => onSelect(e.target.value)}
        className="px-2 py-1 text-sm rounded border cursor-pointer min-w-[150px]"
        style={{
          backgroundColor: theme.colors.background,
          borderColor: `${theme.colors.primary}30`,
          color: theme.colors.text,
        }}
      >
        <option value="">-- Skip --</option>
        {SCHEMA_FIELDS.map((field) => (
          <option
            key={field.key}
            value={field.key}
            disabled={usedFields.includes(field.key) && selectedField !== field.key}
          >
            {field.label} {field.required ? '*' : ''}
          </option>
        ))}
      </select>
    </div>
  );
};

// Main CSV Import Component
export const CSVImport: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const isOpen = usePrimoStore((state) => state.isCSVImportOpen);
  const setCSVImportOpen = usePrimoStore((state) => state.setCSVImportOpen);
  const setFacilities = usePrimoStore((state) => state.setFacilities);
  const loadSampleData = usePrimoStore((state) => state.loadSampleData);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<'upload' | 'mapping' | 'preview'>('upload');
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [parsedFacilities, setParsedFacilities] = useState<Facility[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    Papa.parse(file, {
      complete: (results) => {
        const data = results.data as string[][];
        if (data.length < 2) {
          setErrors(['File must contain headers and at least one row of data']);
          return;
        }
        
        setCsvHeaders(data[0]);
        setCsvData(data.slice(1).filter((row) => row.some((cell) => cell.trim())));
        
        // Auto-map columns with matching names
        const autoMappings: Record<string, string> = {};
        data[0].forEach((header) => {
          const normalizedHeader = header.toLowerCase().replace(/[^a-z0-9]/g, '');
          const matchingField = SCHEMA_FIELDS.find((f) => {
            const normalizedField = f.key.toLowerCase();
            return normalizedHeader.includes(normalizedField) || normalizedField.includes(normalizedHeader);
          });
          if (matchingField) {
            autoMappings[header] = matchingField.key;
          }
        });
        setMappings(autoMappings);
        setStep('mapping');
        setErrors([]);
      },
      error: (error) => {
        setErrors([`Parse error: ${error.message}`]);
      },
    });
    
    e.target.value = '';
  }, []);
  
  const updateMapping = (csvColumn: string, schemaField: string) => {
    setMappings((prev) => ({
      ...prev,
      [csvColumn]: schemaField,
    }));
  };
  
  const validateAndParseFacilities = useCallback(() => {
    const facilities: Facility[] = [];
    const parseErrors: string[] = [];
    
    // Check required fields are mapped
    const mappedFields = Object.values(mappings);
    const requiredFields = SCHEMA_FIELDS.filter((f) => f.required).map((f) => f.key);
    const missingRequired = requiredFields.filter((f) => !mappedFields.includes(f));
    
    if (missingRequired.length > 0) {
      parseErrors.push(`Missing required mappings: ${missingRequired.join(', ')}`);
      setErrors(parseErrors);
      return;
    }
    
    // Create reverse mapping
    const reverseMapping: Record<string, string> = {};
    Object.entries(mappings).forEach(([csv, schema]) => {
      if (schema) reverseMapping[schema] = csv;
    });
    
    csvData.forEach((row, index) => {
      const getValue = (field: string): string => {
        const csvColumn = reverseMapping[field];
        if (!csvColumn) return '';
        const colIndex = csvHeaders.indexOf(csvColumn);
        return colIndex >= 0 ? (row[colIndex] || '').trim() : '';
      };
      
      const getNumber = (field: string): number => {
        const value = getValue(field);
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
      };
      
      try {
        const facility: Facility = {
          id: getValue('id') || `CSV${String(index + 1).padStart(4, '0')}`,
          name: getValue('name'),
          brand: getValue('brand') || 'Unknown',
          facilityType: parseFacilityType(getValue('facilityType')),
          status: parseStatus(getValue('status')),
          address: getValue('address') || undefined,
          city: getValue('city'),
          state: getValue('state'),
          lat: getNumber('lat'),
          lon: getNumber('lon'),
          counts: {
            trucks: getNumber('trucks'),
            trailers: getNumber('trailers'),
            guardShacks: getNumber('guardShacks'),
            gates: getNumber('gates'),
            trailerYards: getNumber('trailerYards'),
            dropDocks: getNumber('dropDocks'),
            inboundLanes: getNumber('inboundLanes'),
            outboundLanes: getNumber('outboundLanes'),
          },
          notes: getValue('notes') || undefined,
        };
        
        // Validate
        const checks = validateFacility(facility);
        const invalidChecks = checks.filter((c) => c.status === 'invalid');
        
        if (invalidChecks.length > 0) {
          parseErrors.push(`Row ${index + 1}: ${invalidChecks.map((c) => c.message).join(', ')}`);
        } else {
          facilities.push(facility);
        }
      } catch (err) {
        parseErrors.push(`Row ${index + 1}: Parse error`);
      }
    });
    
    if (parseErrors.length > 0 && facilities.length === 0) {
      setErrors(parseErrors);
      return;
    }
    
    setParsedFacilities(facilities);
    setErrors(parseErrors);
    setStep('preview');
  }, [csvData, csvHeaders, mappings]);
  
  const handleImport = () => {
    if (parsedFacilities.length > 0) {
      setFacilities(parsedFacilities);
      handleClose();
    }
  };
  
  const handleClose = () => {
    setStep('upload');
    setCsvData([]);
    setCsvHeaders([]);
    setMappings({});
    setParsedFacilities([]);
    setErrors([]);
    setCSVImportOpen(false);
  };
  
  const usedFields = Object.values(mappings).filter(Boolean);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[600px] max-h-[80vh] rounded-xl overflow-hidden"
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.primary}30`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: `${theme.colors.primary}20` }}
            >
              <div>
                <h2 className="font-bold text-lg" style={{ color: theme.colors.text }}>
                  Import CSV Data
                </h2>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  {step === 'upload' && 'Select a CSV file to import'}
                  {step === 'mapping' && 'Map CSV columns to facility fields'}
                  {step === 'preview' && `Preview ${parsedFacilities.length} facilities`}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded hover:bg-white/10 transition-colors"
              >
                <CloseIcon size={20} color={theme.colors.textSecondary} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 max-h-[50vh] overflow-y-auto">
              {/* Upload Step */}
              {step === 'upload' && (
                <div className="space-y-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-8 border-2 border-dashed rounded-lg flex flex-col items-center gap-3 transition-colors hover:border-opacity-100"
                    style={{
                      borderColor: `${theme.colors.primary}50`,
                      backgroundColor: `${theme.colors.background}40`,
                    }}
                  >
                    <UploadIcon size={40} color={theme.colors.primary} />
                    <span style={{ color: theme.colors.text }}>
                      Click to select CSV file
                    </span>
                    <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                      or drag and drop
                    </span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  <div className="text-center">
                    <button
                      onClick={loadSampleData}
                      className="text-sm underline"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      Or load sample data (260 facilities)
                    </button>
                  </div>
                </div>
              )}
              
              {/* Mapping Step */}
              {step === 'mapping' && (
                <div className="space-y-2">
                  <p className="text-sm mb-4" style={{ color: theme.colors.textSecondary }}>
                    Found {csvHeaders.length} columns, {csvData.length} rows. Map each column to a facility field:
                  </p>
                  {csvHeaders.map((header) => (
                    <MappingSelect
                      key={header}
                      csvColumn={header}
                      selectedField={mappings[header] || ''}
                      onSelect={(field) => updateMapping(header, field)}
                      usedFields={usedFields}
                    />
                  ))}
                </div>
              )}
              
              {/* Preview Step */}
              {step === 'preview' && (
                <div className="space-y-4">
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${theme.colors.background}60` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium" style={{ color: theme.colors.text }}>
                        Ready to Import
                      </span>
                      <span
                        className="text-lg font-bold"
                        style={{ color: theme.colors.primary }}
                      >
                        {parsedFacilities.length} facilities
                      </span>
                    </div>
                    {errors.length > 0 && (
                      <p className="text-sm" style={{ color: theme.colors.alert }}>
                        {errors.length} rows had errors and were skipped
                      </p>
                    )}
                  </div>
                  
                  {/* Sample preview */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium" style={{ color: theme.colors.text }}>
                      Sample Preview:
                    </span>
                    {parsedFacilities.slice(0, 3).map((f) => (
                      <div
                        key={f.id}
                        className="p-3 rounded-lg text-sm"
                        style={{ backgroundColor: `${theme.colors.background}40` }}
                      >
                        <div style={{ color: theme.colors.text }}>{f.name}</div>
                        <div style={{ color: theme.colors.textSecondary }}>
                          {f.city}, {f.state} - {f.brand} - {f.facilityType}
                        </div>
                      </div>
                    ))}
                    {parsedFacilities.length > 3 && (
                      <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                        ...and {parsedFacilities.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Errors */}
              {errors.length > 0 && step !== 'preview' && (
                <div
                  className="mt-4 p-3 rounded-lg"
                  style={{ backgroundColor: `${theme.colors.alert}20` }}
                >
                  {errors.slice(0, 5).map((error, i) => (
                    <p key={i} className="text-sm" style={{ color: theme.colors.alert }}>
                      {error}
                    </p>
                  ))}
                  {errors.length > 5 && (
                    <p className="text-sm" style={{ color: theme.colors.alert }}>
                      ...and {errors.length - 5} more errors
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div
              className="px-6 py-4 border-t flex items-center justify-between"
              style={{ borderColor: `${theme.colors.primary}20` }}
            >
              <button
                onClick={step === 'upload' ? handleClose : () => setStep(step === 'preview' ? 'mapping' : 'upload')}
                className="px-4 py-2 text-sm rounded transition-colors hover:bg-white/10"
                style={{ color: theme.colors.textSecondary }}
              >
                {step === 'upload' ? 'Cancel' : 'Back'}
              </button>
              
              {step === 'mapping' && (
                <button
                  onClick={validateAndParseFacilities}
                  className="px-4 py-2 text-sm font-medium rounded transition-colors"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.background,
                  }}
                >
                  Validate & Preview
                </button>
              )}
              
              {step === 'preview' && (
                <button
                  onClick={handleImport}
                  className="px-4 py-2 text-sm font-medium rounded transition-colors"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.background,
                  }}
                >
                  Import {parsedFacilities.length} Facilities
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CSVImport;
