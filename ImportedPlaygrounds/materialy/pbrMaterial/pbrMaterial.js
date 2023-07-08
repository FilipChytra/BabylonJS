var canvasPM = document.getElementById("pbr-material");

        var startRenderLoopPM = function (engine, canvasPM) {
            engine.runRenderLoop(function () {
                if (sceneToRenderPM && sceneToRenderPM.activeCamera) {
                    sceneToRenderPM.render();
                }
            });
        }

        var enginePM = null;
        var scenePM = null;
        var sceneToRenderPM = null;
        var createDefaultEnginePM = function() { return new BABYLON.Engine(canvasPM, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2SupPMrt: false}); };
        var createScenePM = function () {
    var scenePM = new BABYLON.Scene(enginePM);
    scenePM.createDefaultEnvironment({groundOpacity: 0}).skybox.dispose();
    scenePM.clearColor = new BABYLON.Color4(0,0,0,.1);


    var cameraPM = new BABYLON.ArcRotateCamera("camera1", -1/2*Math.PI, 1/3*Math.PI, 10, BABYLON.Vector3.Zero(), scenePM);
    cameraPM.wheelDeltaPercentage = 0.02;
    cameraPM.attachControl(canvasPM, true);

    var lightPM = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-2, 4, 1), scenePM);
    lightPM.intensity = 0.7;

    var koule1 = BABYLON.MeshBuilder.CreateSphere('koule1', {diameter: 1, segments: 10}, scenePM);
    var material1 = new BABYLON.PBRMaterial('material1', scenePM);
    material1.tint
    material1.roughness = 1;
    material1.metallic = 1;
    koule1.material = material1;
    koule1.translate(new BABYLON.Vector3(-1,0,0), 2.5);

    var koule2 = koule1.clone('koule2');
    var material2 = koule2.material.clone('material2');
    material2.roughness = 0;
    koule2.material = material2;
    koule2.translate(new BABYLON.Vector3(1,0,0), 1.5);

    var koule3 = koule2.clone('koule3');
    var material3 = koule2.material.clone('material3');
    material3.metallic = 0;
    koule3.material = material3;
    koule3.translate(new BABYLON.Vector3(1,0,0), 1.5);

    var koule4 = koule3.clone('koule4');
    var material4 = koule3.material.clone('material4');
    material4.roughness = 1;
    koule4.material = material4;
    koule4.translate(new BABYLON.Vector3(1,0,0), 1.5);
    return scenePM;
};
                window.initFunctionPM = async function() {
                    
                    
                    
                    var asyncEngineCreationPM = async function() {
                        try {
                        return createDefaultEnginePM();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEnginePM();
                        }
                    }

                    window.enginePM = await asyncEngineCreationPM();
        if (!enginePM) throw 'engine should not be null.';
        startRenderLoopPM(enginePM, canvasPM);
        window.scenePM = createScenePM();};
        initFunctionPM().then(() => {sceneToRenderPM = scenePM                    
        });