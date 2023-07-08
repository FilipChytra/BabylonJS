var canvasSM = document.getElementById("standard-material");

        var startRenderLoopSM = function (engine, canvasSM) {
            engine.runRenderLoop(function () {
                if (sceneToRenderSM && sceneToRenderSM.activeCamera) {
                    sceneToRenderSM.render();
                }
            });
        }

        var engineSM = null;
        var sceneSM = null;
        var sceneToRenderSM = null;
        var createDefaultEngineSM = function() { return new BABYLON.Engine(canvasSM, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2SupSMrt: false}); };
        var createSceneSM = function () {
    var sceneSM = new BABYLON.Scene(engineSM);
    sceneSM.clearColor = new BABYLON.Color4(0,0,0,.1);
    sceneSM.ambientColor = new BABYLON.Color3(1, 1, 1);


    var cameraSM = new BABYLON.ArcRotateCamera("camera1", -1/2*Math.PI, 1/3*Math.PI, 15, BABYLON.Vector3.Zero(), sceneSM);
    cameraSM.wheelDeltaPercentage = 0.02;
    cameraSM.attachControl(canvasSM, true);

    var lightSM = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-2, 4, 1), sceneSM);
    lightSM.intensity = 0.7;

    var koule = BABYLON.MeshBuilder.CreateSphere('koule', {diameter: 1, segments: 10}, sceneSM);
    koule.translate(new BABYLON.Vector3(-1,0,0), 4.5);

    var koule1 = BABYLON.MeshBuilder.CreateSphere('koule1', {diameter: 1, segments: 10}, sceneSM);
    var material1 = new BABYLON.StandardMaterial('material1', sceneSM);
    material1.diffuseColor = new BABYLON.Color3(1 , 0, 0);
    koule1.material = material1;
    koule1.translate(new BABYLON.Vector3(-1,0,0), 3);

    var koule2 = koule1.clone('koule2');
    var material2 = koule2.material.clone('material2');
    material2.specularColor = new BABYLON.Color3(0 , 1 , 0);
    koule2.material = material2;
    koule2.translate(new BABYLON.Vector3(1,0,0), 1.5);

    var koule3 = koule2.clone('koule3');
    var material3 = koule2.material.clone('material3');
    material3.specularPower = 10;
    koule3.material = material3;
    koule3.translate(new BABYLON.Vector3(1,0,0), 1.5);

    var koule4 = koule3.clone('koule4');
    var material4 = koule3.material.clone('material4');
    material4.ambientColor = new BABYLON.Color3 (0 ,0 ,0.5);
    koule4.material = material4;
    koule4.translate(new BABYLON.Vector3(1,0,0), 1.5);

    var koule5 = koule4.clone('koule5');
    var material5 = koule4.material.clone('material5');
    material5.emissiveColor = new BABYLON.Color3(0.25 ,0.25 ,0.25);
    koule5.material = material5;
    koule5.translate(new BABYLON.Vector3(1,0,0), 1.5);

    var koule6 = koule5.clone('koule6');
    var material6 = koule5.material.clone('material6');
    material6.alpha = 0.5;
    koule6.material = material6;
    koule6.translate(new BABYLON.Vector3(1,0,0), 1.5);
    return sceneSM;
};
                window.initFunctionSM = async function() {
                    
                    
                    
                    var asyncEngineCreationSM = async function() {
                        try {
                        return createDefaultEngineSM();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngineSM();
                        }
                    }

                    window.engineSM = await asyncEngineCreationSM();
        if (!engineSM) throw 'engine should not be null.';
        startRenderLoopSM(engineSM, canvasSM);
        window.sceneSM = createSceneSM();};
        initFunctionSM().then(() => {sceneToRenderSM = sceneSM                    
        });