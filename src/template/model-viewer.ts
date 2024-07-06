// import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight } from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TemplateBase } from "./template-base";

type Events = {
	onBackClicked: () => void;
}

export class ModelViewer extends TemplateBase {

	private readonly modelName: string;

	private readonly modelId: string;

	private readonly events: Events;

	constructor(modelName: string, modelId: string, events: Events) {
		super("model-viewer");
		this.modelName = modelName;
		this.modelId = modelId;
		this.events = events;
		console.log("modelId", this.modelId);
		this.add();
	}

	public add() {
		const container = document.createElement("div");
		container.id = this.elementId;

		const header = document.createElement("h3");
		header.textContent = this.modelName;
		container.appendChild(header);

		const backButton = document.createElement("button");
		backButton.innerText = "Back";
		backButton.style.position = "absolute"
		backButton.style.top = "5px";
		backButton.style.left = "5px";
		backButton.onclick = this.events.onBackClicked;
		container.appendChild(backButton);


		this.appContainer.appendChild(container);
	}

	// private loadScene(url: string) {
	// 	const scene = new Scene();
	// 	const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	// 	const ambientLight = new AmbientLight(0xffffff, 0.4);
	// 	scene.add(ambientLight);

	// 	const dirLight = new DirectionalLight(0xefefff, 1.5);
	// 	dirLight.position.set(10, 10, 10);
	// 	scene.add(dirLight);

	// 	const loader = new GLTFLoader();

	// 	const renderer = new WebGLRenderer();
	// 	renderer.setSize(window.innerWidth, window.innerHeight);
	// 	renderer.setAnimationLoop(animate);
	// 	this.appContainer.appendChild(renderer.domElement);

	// 	camera.position.z = 5;

	// 	loader.load(
	// 		url,
	// 		(gltf) => {
	// 			scene.add(gltf.scene);
	// 			gltf.animations; // Array<THREE.AnimationClip>
	// 			gltf.scene; // THREE.Group
	// 			gltf.scenes; // Array<THREE.Group>
	// 			gltf.cameras; // Array<THREE.Camera>
	// 			gltf.asset; // Object
	// 		},
	// 		(xhr) => {
	// 			console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
	// 		},
	// 		(error) => {
	// 			console.error(error);
	// 		},
	// 	);

	// 	function animate() {
	// 		renderer.render(scene, camera);
	// 		console.log(renderer.info);
	// 	}
	// }
}
