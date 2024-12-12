import { theme as antdTheme,ConfigProvider ,} from 'antd';
import { useEffect, useState } from 'react';
import { themeBus } from '@/utils/theme-bus.ts';


const AntdUIProvider = ({children}) => {

  const [theme, setTheme] = useState<string>('defaultAlgorithm');
  
  useEffect(() => {
    const bus = themeBus.subscribe((value) => {
      let t:string=value;
      if(value==='toggle'){
        t = theme==='defaultAlgorithm'?'darkAlgorithm':'defaultAlgorithm';
      }
      document.querySelector('html')?.setAttribute('data-theme', t);
      setTheme(t)
    })
    
    return ()=>{
      bus.unsubscribe()
    }
  }, [theme]);
  
  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme[theme],
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#00b96b',
          borderRadius: 2,

        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdUIProvider
