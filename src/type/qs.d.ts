declare module 'qs' {
  const qs: {
    stringify: (obj: any, options?: any) => string;
    parse: (str: string, options?: any) => any;
  };
  export default qs;
}
