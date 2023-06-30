var canvas = document.getElementById("renderCanvas");

        var startRenderLoop = function (engine, canvas) {
            engine.runRenderLoop(function () {
                if (sceneToRender && sceneToRender.activeCamera) {
                    sceneToRender.render();
                }
            });
        }

        var engine = null;
        var scene = null;
        var sceneToRender = null;
        var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    scene.clearColor.a = 0;

    // This creates and positions a free camera (non-mesh)
    var target = new BABYLON.Vector3(0,1,0);
    var camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / -4 ,1 / 2 * Math.PI, 6, target , scene);
    camera.attachControl(scene, true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 8, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1;

    // Our built-in 'sphere' shape.
    // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    BABYLON.SceneLoader.append("","https://raw.githubusercontent.com/ChrisOsprey/models/main/desktop/", "scene.gltf", scene, function (meshes){
        meshes[0].position = new BABYLON.Vector3(0, 0, 0);  
        meshes[0].rotation = new BABYLON.Vector3(0, 0, 0);
    })

    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;

    // Our built-in 'ground' shape

    return scene;
};
                window.initFunction = async function() {
                    
                    
                    var asyncEngineCreation = async function() {
                        try {
                        return createDefaultEngine();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngine();
                        }
                    }

                    window.engine = await asyncEngineCreation();
        if (!engine) throw 'engine should not be null.';
        startRenderLoop(engine, canvas);
        window.scene = createScene();};
        initFunction().then(() => {sceneToRender = scene                    
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });