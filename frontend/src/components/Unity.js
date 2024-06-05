
import React from 'react'
import { Unity, useUnityContext } from "react-unity-webgl";

function unity() {

    const { unityProvider } = useUnityContext({
        loaderUrl:"Build/Web.loader.js",
        dataUrl: "Build/webgl.data",
        frameworkUrl: "Build/build.framework.js",
        codeUrl: "Build/build.wasm",
        });

      return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh' // Takes the full height of the viewport
        }}>
            <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
        </div>
    );
}

export default unity