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
    title: 'LinkedIn',
    description: 'Description for Link 1',
    url: 'https://example.com/link1',
  },
  {
    title: 'GitHub',
    description: 'Description for Link 2',
    url: 'https://example.com/link2',
  },
  {
    title: 'Instagram',
    description: 'Description for Link 2',
    url: 'https://example.com/link2',
  },
  // Add more links as needed
];

const Links: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('MyCanvas') as HTMLCanvasElement;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./assets/fullmapb.jpg'); // Replace with the path to your image
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    camera.position.z = 5;



    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    const animateSphere = () => {
      //sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      requestAnimationFrame(animateSphere);
      renderer.render(scene, camera);
    };
    
    animateSphere();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <canvas id="MyCanvas" style={{ width: '100%', height: '100vh' }}></canvas>  
      
      <ChakraProvider>
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="100vh"
          overflowY="auto"
          py={20}
          bg="rgba(0, 0, 0, 0.1)"
          position="absolute"
          top="0"
          width="100%"
        >
          <Image
            src="./assets/Seiti.jpg"
            alt="Logo"
            boxSize={120}
            align="center"
            my={6}
            borderRadius="full"
            fit="cover"
          />
          <Box width="70%" maxWidth="1200px">
            {links.map((link, index) => (
              <LinkCard key={index} {...link} />
            ))}
          </Box>
        </Flex>
      </ChakraProvider>
    </div>
  );
};

export default Links;