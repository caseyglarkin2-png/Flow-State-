declare module '@hcaptcha/react-hcaptcha' {
  import * as React from 'react';

  export interface HCaptchaProps {
    sitekey: string;
    onVerify?: (token: string, ekey?: string) => void;
    onExpire?: () => void;
  }

  const HCaptcha: React.ComponentType<HCaptchaProps>;
  export default HCaptcha;
}
