import { useState } from "react";
import { ARAnchor, ARView } from "react-three-mind";
//@ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ambientLight, pointLight } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
const isSmallScreen = window.innerWidth < 768;
const isPhone = isMobile || isSmallScreen;

const ARModel = () => {
  const { scene } = useGLTF("/models/meals_mk.glb");
  return <primitive object={scene} scale={0.5} />;
};

const Home: React.FC = () => {
  const [found, setFound] = useState(false);

  const handleFound = () => {
    console.log("✅ 圖標掃到！");
    setFound(true);
  };

  return (
    <>
      {/* ✅ 手機且已掃到圖後，就移除 ARView，避免白屏 */}
      {isPhone && found ? (
        <div className="model-viewer-wrapper">
          <model-viewer src="/models/meals_mk.glb" ios-src="/models/car_model.usdz" alt="3D model" ar ar-modes="scene-viewer quick-look" camera-controls auto-rotate shadow-intensity="1" style={{ width: "100%", height: "100%" }}>
            <button slot="ar-button" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-black font-semibold py-2 px-5 rounded-lg shadow-lg hover:bg-cyan-300 transition">
              🚀 啟動 AR 模式
            </button>
          </model-viewer>
        </div>
      ) : (
        <ARView imageTargets="/models/targets.mind" filterMinCF={1} filterBeta={10000} missTolerance={0} warmupTolerance={0}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <ARAnchor target={0} onAnchorFound={handleFound}>
            <ARModel />
          </ARAnchor>
        </ARView>
      )}
    </>
  );
};

export default Home;
