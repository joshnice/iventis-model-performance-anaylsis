import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, Color } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TemplateBase } from "./template-base";
import { $models } from "../network-listeners/model-network-listeners";
import { OrbitControls } from "three/examples/jsm/Addons.js";

type Events = {
	onBackClicked: () => void;
}

export class ModelViewer extends TemplateBase {

	private readonly modelName: string;

	private readonly modelId: string;

	private readonly events: Events;

	private container: HTMLDivElement | null = null;

	private modelAndStatsContainer: HTMLDivElement | null = null;

	private previewWidth = 300;

	private previewHeight = 300;

	private stats: { calls: number, lines: number, points: number, triangles: number, geometries: number, textures: number } | null = null;

	private showingModel = false;


	constructor(modelName: string, modelId: string, events: Events) {
		super("model-viewer");
		this.modelName = modelName;
		this.modelId = modelId;
		this.events = events;
		this.add();
	}

	public add() {
		this.addContainer();
		this.addHeader();
		this.addModelAndStatsContainer();

		$models.subscribe((models) => {
			const modelUrl = models[this.modelId];
			if (modelUrl != null && !this.showingModel) {
				this.addModel(modelUrl);
				this.showingModel = true;
			}
		});

		this.appContainer.appendChild(this.getContainer());
	}

	private addContainer() {
		this.container = document.createElement("div");
		this.container.id = this.elementId;
	}

	private getContainer() {
		if (this.container == null) {
			throw new Error("Container is null");
		}
		return this.container;
	}

	private addModelAndStatsContainer() {
		this.modelAndStatsContainer = document.createElement("div");
		this.modelAndStatsContainer.id = `${this.elementId}-model-stats-container`;
		this.getContainer().appendChild(this.modelAndStatsContainer);
	}

	private getModelAndStatsContainer() {
		if (this.modelAndStatsContainer == null) {
			throw new Error("Container is null");
		}
		return this.modelAndStatsContainer;
	}

	private addHeader() {
		const header = document.createElement("h2");
		header.textContent = this.modelName;
		header.id = `${this.elementId}-header`;
		this.getContainer().appendChild(header);
	}

	private addBackButton() {
		const backButton = document.createElement("button");
		backButton.id = `${this.elementId}-back-button`;
		backButton.innerText = "Back";
		backButton.onclick = this.events.onBackClicked;
		this.getContainer().appendChild(backButton);
	}

	private addStats() {
		if (this.stats == null) {
			throw new Error("Stats is null");
		}

		const statsContainer = document.createElement("div");
		statsContainer.id = `${this.elementId}-stats`;

		Object.entries(this.stats).forEach(([name, value]) => {
			const element = document.createElement("p");
			element.innerText = `${name} = ${value}`;
			statsContainer.appendChild(element);
		});
		this.getModelAndStatsContainer().appendChild(statsContainer);
	}

	private addModel(url: string) {
		const scene = new Scene();
		const camera = new PerspectiveCamera(75, this.previewWidth / this.previewHeight, 0.1, 1000);

		scene.background = new Color(0xcccccc);

		const dirLight1 = new DirectionalLight(0xffffff, 3);
		dirLight1.position.set(1, 1, 1);
		scene.add(dirLight1);

		const dirLight2 = new DirectionalLight(0x002288, 3);
		dirLight2.position.set(- 1, - 1, - 1);
		scene.add(dirLight2);

		const ambientLight = new AmbientLight(0x555555);
		scene.add(ambientLight);

		const loader = new GLTFLoader();

		const renderer = new WebGLRenderer();

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.listenToKeyEvents(window); // optional

		renderer.setSize(this.previewWidth, this.previewHeight);
		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
			const { info } = renderer;
			if (this.stats == null && info.render.calls !== 0) {
				this.stats = {
					calls: info.render.calls,
					geometries: info.memory.geometries,
					textures: info.memory.textures,
					lines: info.render.lines,
					points: info.render.points,
					triangles: info.render.triangles,
				}
				this.addStats();
				this.addBackButton();
			}

		});
		this.getModelAndStatsContainer().appendChild(renderer.domElement);

		camera.position.z = 5;

		loader.load(
			url,
			(gltf) => {
				scene.add(gltf.scene);
				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object
			},
			() => {
			},
			(error) => {
				console.error(error);
			},
		);
	}
}
