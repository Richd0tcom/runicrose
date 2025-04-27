"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { gsap } from "gsap"

export default function NetworkMap() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x00020a)

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Create network nodes and connections
    const nodes = []
    const connections = []
    const nodeCount = 50
    const connectionCount = 70

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const geometry = new THREE.SphereGeometry(0.05, 16, 16)
      const material = new THREE.MeshBasicMaterial({
        color: i % 5 === 0 ? 0x18c7fe : 0x06f7a1,
        transparent: true,
        opacity: 0.8,
      })
      const node = new THREE.Mesh(geometry, material)

      // Position nodes in a disk shape
      const radius = 4 * Math.random()
      const theta = Math.random() * Math.PI * 2
      node.position.x = radius * Math.cos(theta)
      node.position.y = radius * Math.sin(theta) * 0.5 // Flatten the disk
      node.position.z = (Math.random() - 0.5) * 2

      scene.add(node)
      nodes.push(node)

      // Animate node appearance
      gsap.from(node.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        delay: i * 0.02,
        ease: "elastic.out(1, 0.5)",
      })
    }

    // Create connections between nodes
    for (let i = 0; i < connectionCount; i++) {
      const startNode = nodes[Math.floor(Math.random() * nodes.length)]
      const endNode = nodes[Math.floor(Math.random() * nodes.length)]

      if (startNode !== endNode) {
        const points = [startNode.position, endNode.position]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: 0x18c7fe,
          transparent: true,
          opacity: 0.3,
        })
        const line = new THREE.Line(geometry, material)
        scene.add(line)
        connections.push(line)

        // Animate line appearance
        gsap.from(material, {
          opacity: 0,
          duration: 1,
          delay: i * 0.01 + 0.5,
        })
      }
    }

    // Add a central glow
    const glowGeometry = new THREE.SphereGeometry(1.5, 32, 32)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x18c7fe,
      transparent: true,
      opacity: 0.1,
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    scene.add(glow)

    // Pulse animation for the glow
    gsap.to(glowMaterial, {
      opacity: 0.2,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the entire scene slowly
      scene.rotation.y += 0.001

      // Update controls
      controls.update()

      // Render scene
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      nodes.forEach((node) => {
        node.geometry.dispose()
        node.material.dispose()
      })

      connections.forEach((line) => {
        line.geometry.dispose()
        line.material.dispose()
      })

      glowGeometry.dispose()
      glowMaterial.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-[400px] md:h-[500px] bg-[#00020a] rounded-lg overflow-hidden"></div>
  )
}
