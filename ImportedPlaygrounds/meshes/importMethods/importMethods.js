var canvasIM = document.getElementById("import-methods");

        var startRenderLoopIM = function (engine, canvasIM) {
            engine.runRenderLoop(function () {
                if (sceneToRenderIM && sceneToRenderIM.activeCamera) {
                    sceneToRenderIM.render();
                }
            });
        }

        var engineIM = null;
        var sceneIM = null;
        var sceneToRenderIM = null;
        var createDefaultEngineIM = function() { return new BABYLON.Engine(canvasIM, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2SupIMrt: false}); };
        var createSceneIM = function () {
    var sceneIM = new BABYLON.Scene(engineIM);
    sceneIM.clearColor = new BABYLON.Color4(0,0,0,.1);


    var cameraIM = new BABYLON.ArcRotateCamera("camera1", 1/2*Math.PI, 1/3*Math.PI, 25, BABYLON.Vector3.Zero(), sceneIM);
    cameraIM.wheelDeltaPercentage = 0.02;
    cameraIM.attachControl(canvasIM, true);

    var lightIM = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(-2, 4, 1), sceneIM);
    lightIM.intensity = 0.7;

    var importMeshAsync = BABYLON.SceneLoader.ImportMeshAsync ("", "https://raw.githubusercontent.com/ChrisOsprey/models/main/","babylon-logo.glb",sceneIM);
    importMeshAsync.then((scene1) => {
        scene1.meshes.forEach((mesh) => {
            mesh.translate(new BABYLON.Vector3(1,0,0), 4);
        })
    })

    var appendAsync = BABYLON.SceneLoader.AppendAsync("https://raw.githubusercontent.com/ChrisOsprey/models/main/", "babylon-logo.glb", sceneIM);
    appendAsync.then((scene2) => {
        scene2.meshes.forEach((mesh, index) => {
            mesh.translate(new BABYLON.Vector3(1,0,0), -2);
        })
    })
    return sceneIM;
};
                window.initFunctionIM = async function() {
                    
                    
                    
                    var asyncEngineCreationIM = async function() {
                        try {
                        return createDefaultEngineIM();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngineIM();
                        }
                    }

                    window.engineIM = await asyncEngineCreationIM();
        if (!engineIM) throw 'engine should not be null.';
        startRenderLoopIM(engineIM, canvasIM);
        window.sceneIM = createSceneIM();};
        initFunctionIM().then(() => {sceneToRenderIM = sceneIM                    
        });