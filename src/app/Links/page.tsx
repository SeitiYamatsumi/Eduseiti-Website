'use client';
import { useEffect } from 'react';
import * as THREE from 'three';
import { ChakraProvider, Flex, Image, Box } from '@chakra-ui/react';
import LinkCard from './components/LinkCard';
interface Link {
  title: string;
  description: string;
  url: string;
}

const links: Link[] = [
  {
    title: 'Link 1',
    description: 'Description for Link 1',
    url: 'https://example.com/link1',
  },
  {
    title: 'Link 2',
    description: 'Description for Link 2',
    url: 'https://example.com/link2',
  },
  // Add more links as needed
];



const Links: React.FC = () => {
  useEffect(() => {
    const MyCanvas = document.getElementById('MyCanvas') as HTMLCanvasElement;
    const scene = new THREE.Scene();

    // Adjust the initial camera aspect ratio based on the canvas size
    const camera = new THREE.PerspectiveCamera(75, MyCanvas.clientWidth / MyCanvas.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: MyCanvas,
    });
    renderer.setSize(MyCanvas.clientWidth, MyCanvas.clientHeight);

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      // Update camera aspect ratio and renderer size
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <body>
      <canvas id="MyCanvas" style={{ width: '100%', height: '100vh' }}></canvas>
      <ChakraProvider>
        <Flex
          direction="column"
          align="center"
          justify="space-evenly"
          minH="100vh"
          overflowY="auto"
          py={20}
          bg="rgba(0, 0, 0, 0.1)"
          position={"absolute"}
          top="0"
          width = {"100%"}
        >
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfXpi1Nrns6Lg_qmU2V4jJ4kexQbqsgKyCxg&usqp=CAU"
            alt="Logo"
            boxSize={120}
            align={"center"}
            my={6}
            borderRadius='full'
            fit={'cover'}
          />

          <Box width={'70%'} maxWidth={'1200px'}>
            {links.map((link, index) => (
              <LinkCard key={index} {...link} />
            ))}
          </Box>
        </Flex>
      </ChakraProvider>
    </body>
  );
};

export default Links;