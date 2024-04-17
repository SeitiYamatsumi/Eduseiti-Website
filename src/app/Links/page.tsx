'use client';
import { useEffect } from 'react';
import * as THREE from 'three';
import { ChakraProvider, Flex, Image, Box, Heading, extendTheme } from '@chakra-ui/react';
import LinkCard from '../components/LinkCard';
import '../globals.css';
import '@fontsource/poppins';

const theme = extendTheme({
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
    // You can add other font styles here if needed
  },
});
interface Link {
  title: string;
  description: string;
  url: string;
}

const links: Link[] = [
  {
    title: 'LinkedIn',
    description: 'Professional profile',
    url: 'https://www.linkedin.com/in/eduardo-seiti-yamatsumi/',
  },
  {
    title: 'Instagram',
    description: 'Personal profile',
    url: 'https://www.instagram.com/seiti.y/',
  },
  {
    title: 'LINE',
    description: 'line profile',
    url: 'https://line.me/ti/p/s87PENk_EU',
  }

  // Add more links as needed
];

const Links: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('MyCanvas') as HTMLCanvasElement;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 10000);
    camera.position.z = 300; // Adjusted camera position to be inside the torus

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

    // Load Milky Way texture
    const loader = new THREE.TextureLoader();
    const milkyWayTexture = loader.load('./assets/milky way.webp');
    milkyWayTexture.wrapS = THREE.RepeatWrapping;
    milkyWayTexture.wrapT = THREE.RepeatWrapping;
    // Create torus for the Milky Way background
    const torusGeometry = new THREE.TorusGeometry(5000, 300, 32, 100); // Adjusted torus geometry
    const torusMaterial = new THREE.MeshBasicMaterial({ map: milkyWayTexture, side: THREE.DoubleSide, opacity: 0.8, transparent: true });
    const backgroundTorus = new THREE.Mesh(torusGeometry, torusMaterial);
    backgroundTorus.rotation.y = Math.PI / 2;
    backgroundTorus.material.color = new THREE.Color(0.13, 0.08, 0.3); // Adjusted color
    scene.add(backgroundTorus);
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    // Function to create random stars and planets
    function createstars() {
      const objects = new THREE.Group();

      // Create stars
      const starsGeometry = new THREE.BufferGeometry();
      const starsPositions = [];

      for (let i = 0; i < 1000; i++) {
        const x = THREE.MathUtils.randFloatSpread(1000); // Adjusted spread for torus size
        const y = THREE.MathUtils.randFloatSpread(1000)+2500
        const z = THREE.MathUtils.randFloatSpread(1000);
        const distance = Math.sqrt(x * x + y * y + z * z);

        // Ensure stars are not too close to the camera
        if (distance > 10) {
          starsPositions.push(x, y, z);
        }
      }

      starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsPositions, 3));

      const starsMaterial = new THREE.PointsMaterial({ color: 0xffefdf });
      const starField = new THREE.Points(starsGeometry, starsMaterial);
      objects.add(starField);

      return objects;
    }

  function createPlanets(numberOfPlanets: number): THREE.Group {
      const objects: THREE.Group = new THREE.Group();
      const geometry = new THREE.SphereGeometry(10, 32, 32);
      const texture = new THREE.TextureLoader().load('./assets/fullmapb.webp');
      const material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, opacity: 0.8, transparent: true});

      const positions = new Float32Array(numberOfPlanets * 3);

      // Define torus parameters
      const torusRadius = 5000; // Mesmo raio do toroide
      const tubeRadius = 300; // Mesmo raio do toroide

      for (let i = 0; i < numberOfPlanets; i++) {
          // Gerar ângulo aleatório na circunferência do toroide
          const theta = Math.random() * Math.PI * 2;
          // Gerar posição aleatória no raio do toroide
          const phi = Math.random() * Math.PI * 2;
          const radius = Math.random() * (tubeRadius); // Ajustado para o raio do toroide

          // Converter coordenadas polares para coordenadas cartesianas
          const x = (torusRadius + tubeRadius * Math.cos(phi)) * Math.cos(theta);
          const y = tubeRadius * Math.sin(phi);
          const z = (torusRadius + tubeRadius * Math.cos(phi)) * Math.sin(theta);

          const index = i * 3;
          positions[index] = x;
          positions[index + 1] = y;
          positions[index + 2] = z;
      }

      const geometryPositions = new THREE.BufferAttribute(positions, 3);
      geometry.setAttribute('position', geometryPositions);

      for (let i = 0; i < numberOfPlanets; i++) {
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.fromBufferAttribute(geometryPositions, i);
          objects.add(mesh);
      }

      return objects;
  }
    const planetsGroup = createPlanets(10);
    scene.add(planetsGroup);
    //const starsGroup = createstars();
    
    camera.position.y = 5000
    //camera.position.x = 2000

    const animate = () => {
      // Rotate the torus on the x axis
      backgroundTorus.rotation.z += 0.001;


      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", maxHeight: "100%", overflow: "auto" }}>

      <ChakraProvider theme={theme}>

        <Flex
          direction="column"
          align="center"
          justify="center"
          py={20}
          width="100%"
          position="relative"
          zIndex={1}
        >
          <Image
            src="./assets/Seiti.webp"
            alt="Logo"
            boxSize={120}
            align="center"
            my={6}
            borderRadius="full"
            fit="cover"
          />
          <Heading size="md" color="white" textAlign="center" pt={2} pb={8} >
            Yamatsumi Eduardo Seiti
          </Heading>
          <Box width="70%" maxWidth="1200px">
            {links.map((link, index) => (
              <LinkCard key={index} {...link} />
            ))}
          </Box>
        </Flex>
      </ChakraProvider>
      <canvas id="MyCanvas" style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0
      }}></canvas>
    </div>
  );
};

export default Links;