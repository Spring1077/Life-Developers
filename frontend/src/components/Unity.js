
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
            height: '80vh', // Toma toda la altura de la ventana
            width: '100%', // Toma todo el ancho disponible
            padding: '30px 20px' // Agrega un relleno a los lados para dejar espacio para otros elementos
        }}>
            <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
        </div>        
    );
}

export default unity