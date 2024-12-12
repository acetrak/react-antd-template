import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';

interface ScreenAdapterProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const ScreenAdapter: React.FC<ScreenAdapterProps> = ({ width = 1920, height = 1080, children }) => {

  const [style, setStyle] = useState<React.CSSProperties>({
    width: `${width}px`,
    height: `${height}px`,
    transform: 'scale(1) translate(-50%, -50%)',
  });


  useEffect(() => {
    const getScale = () => {
      const w = window.innerWidth / width;
      const h = window.innerHeight / height;
      return w < h ? w : h;
    };

    const setScale = () => {
      const scale = window.innerWidth === 960 ? 0.5 : getScale();
      document.querySelector('html')?.setAttribute('data-scale', String(scale));
      setStyle(prevStyle => ({
        ...prevStyle,
        transform: `scale(${scale}) translate(-50%, -50%)`,
      }));
    };
    
    setScale();

    const debouncedSetScale = debounce(setScale, 500);

    window.addEventListener('resize', debouncedSetScale);

    return () => {
      window.removeEventListener('resize', debouncedSetScale);
    };
  }, [width, height,]);

  return (
    <div
      className="screen-adapter"
      style={{
        ...style,
        transformOrigin: '0 0',
        position: 'absolute',
        left: '50%',
        top: '50%',
        overflow: 'hidden',
        transition: '0.3s',
      }}
    >
      {children}
    </div>
  );
};

export default ScreenAdapter;
