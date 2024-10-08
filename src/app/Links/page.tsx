"use client";
import { useEffect } from "react";
import * as THREE from "three";
import {
  ChakraProvider,
  Flex,
  Image,
  Box,
  Heading,
  extendTheme,
} from "@chakra-ui/react";
import LinkCard from "../components/LinkCard";
import "../globals.css";
import "@fontsource/poppins";

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
    title: "LinkedIn",
    description: "Professional profile",
    url: "https://www.linkedin.com/in/eduardo-seiti-yamatsumi/",
  },
  {
    title: "Instagram",
    description: "Personal profile",
    url: "https://www.instagram.com/seiti.y/",
  },
  {
    title: "Github",
    description: "Github profile",
    url: "https://github.com/SeitiYamatsumi",
  },

  // Add more links as needed
];

const Links: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById("MyCanvas") as HTMLCanvasElement;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );

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

    window.addEventListener("resize", handleResize);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("./assets/fullmapb.webp"); // Replace with the path to your image
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Load Milky Way texture
    const loader = new THREE.TextureLoader();
    const milkyWayTexture = loader.load("./assets/milky way.webp");

    // Create sphere for the Milky Way background
    const sphereGeometry = new THREE.SphereGeometry(900, 32, 32); // Large sphere to encompass the scene
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: milkyWayTexture,
      side: THREE.BackSide,
    });
    const backgroundSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // Reduce the brightness by adjusting the color
    backgroundSphere.material.color = new THREE.Color(0.13, 0.08, 0.3); // Adjust the RGB values as needed
    scene.add(backgroundSphere);
    sphereGeometry.rotateZ(Math.PI / 7);
    sphereGeometry.rotateY(Math.PI / 4);
    // Function to create random stars
    function createStars() {
      const starsGeometry = new THREE.BufferGeometry();
      const starsPositions = [];

      for (let i = 0; i < 1000; i++) {
        const x = THREE.MathUtils.randFloatSpread(800);
        const y = THREE.MathUtils.randFloatSpread(800);
        const z = THREE.MathUtils.randFloatSpread(800);
        starsPositions.push(x, y, z);
      }

      starsGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starsPositions, 3)
      );

      const starsMaterial = new THREE.PointsMaterial({ color: 0xffefdf });
      const starField = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starField);
    }

    // Call the function to create stars
    createStars();

    camera.position.z = 7;
    camera.position.y = 2;
    camera.position.x = -6;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(1, 5, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const animateSphere = () => {
      //sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      const diagonalMovement = 0.01 * Math.sqrt(2); // Adjust the factor for desired speed

      // Update position based on rotation
      camera.position.x += 2 * diagonalMovement * Math.sin(sphere.rotation.y);
      camera.position.y += 0.3 * diagonalMovement * Math.sin(sphere.rotation.y);
      camera.position.z += diagonalMovement * Math.cos(sphere.rotation.y);

      requestAnimationFrame(animateSphere);
      renderer.render(scene, camera);
    };

    animateSphere();

    return () => {
      window.removeEventListener("resize", handleResize);
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
          <Heading size="md" color="white" textAlign="center" pt={2} pb={8}>
            Yamatsumi Eduardo Seiti
          </Heading>
          <Box width="70%" maxWidth="1200px">
            {links.map((link, index) => (
              <LinkCard key={index} {...link} />
            ))}
          </Box>
        </Flex>
      </ChakraProvider>
      <canvas
        id="MyCanvas"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
      ></canvas>
    </div>
  );
};

export default Links;
