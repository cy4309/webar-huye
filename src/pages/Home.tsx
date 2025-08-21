import { useState, useRef } from "react";
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
  const mvRef = useRef<any>(null);

  const handleFound = () => {
    console.log("✅ 圖標掃到！");
    setFound(true);
  };

  return (
    <>
      {isPhone && found ? (
        <div className="model-viewer-wrapper">
          <model-viewer
            ref={mvRef}
            src="/models/ani-test2.glb"
            ios-src="/models/MitaSideGirl__Selfi.usdz"
            ar
            ar-modes="scene-viewer webxr quick-look"
            camera-controls
            auto-rotate
            autoplay
            // animation-name="骨架Action"
            animation-loop
            shadow-intensity="1"
            style={{ width: "100%", height: "100%" }}
          >
            <button
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-cyan-400 text-black font-semibold py-2 px-5 rounded-lg shadow-lg hover:bg-cyan-300 transition"
              slot="ar-button"
              onClick={async (e) => {
                e.stopPropagation();
                const mv = mvRef.current;
                if (!mv) return;

                try {
                  if (mv.canActivateAR) {
                    await mv.activateAR(); // Android: Scene Viewer / WebXR；iOS: Quick Look
                  } else {
                    // === Fallbacks ===
                    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                    if (isIOS) {
                      // 直接開 Quick Look 連結
                      window.location.href = "/models/MitaSideGirl__Selfi.usdz";
                    } else {
                      // 直接開 Scene Viewer intent（保險做法，可留著）
                      const glb = encodeURIComponent(
                        new URL(
                          "/models/ani-test2.glb",
                          window.location.href
                        ).toString()
                      );
                      const fallback = encodeURIComponent(window.location.href);
                      window.location.href =
                        `intent://arvr.google.com/scene-viewer/1.0?file=${glb}&mode=ar_preferred` +
                        `#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;` +
                        `S.browser_fallback_url=${fallback};end;`;
                    }
                  }
                } catch (err) {
                  console.warn("activateAR failed:", err);
                }
              }}
            >
              🚀 啟動 AR 模式
            </button>
          </model-viewer>
        </div>
      ) : (
        <ARView
          imageTargets="/models/targets.mind"
          filterMinCF={1}
          filterBeta={10000}
          missTolerance={0}
          warmupTolerance={0}
        >
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
