import { Button, Flex } from 'antd';
import { themeBus } from '@/utils/theme-bus.ts';

function Index() {

  const handleTheme = () => {
    themeBus.next('toggle')
  }
  return (
    <>
      <h1 className="text-3xl font-bold underline dark:text-4xl">
        Hello world!
      </h1>
      <div className="dark:bg-pink-500 bg-green-500 h-20"></div>
      <Flex gap="small" wrap>
        <Button onClick={handleTheme} type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
    </>
  );
}

export default Index;
