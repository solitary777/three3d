<template>
  <div class="home">
    <div id="container" style="height: 100vh"></div>
    <div class="btn-list">
      <button @click="handleChangeScene(1)" id="btn1">场景1</button>
      <button @click="handleChangeScene(2)" id="btn2">场景2</button>
    </div>
    <div class="el-ui">
      <el-slider
      v-model="value"
      range
      show-stops
      :min="-90"
      :max="90">
    </el-slider>
    <button @click="handleSave">应用</button>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import scene1 from "../../assets/images/livingRoom.jpg";
import scene2 from "../../assets/images/kitchen.jpg";
export default {
  components: {},
  data() {
    return {
      texture1: null,
      texture2: null,
      material: null,
      value: [-90, 90],
      controls: null
    };
  },
  mounted() {
    this.handleInit();
  },
  methods: {
    // 处理初始化
    handleInit() {
      const elWidth = window.innerWidth;
      const elHeight = window.innerHeight;
      const stats = new window.Stats();
      document.body.appendChild(stats.dom);
      // 创建场景
      const scene = new THREE.Scene();
      // 创建相机
      const camera = new THREE.PerspectiveCamera(
        75,
        elWidth / elHeight,
        1,
        1100
      );
      /** 注意 三个值中有1个值不能为 0
       * 参数1: X轴左右位置
       * 参数2: Y轴上下位置
       * 参数3: Z轴视距
       */
      camera.position.set(0, 0, 30);
      // camera.lookAt(new THREE.Vector3(0,0,0))
      // 坐标系创建
      const as = new THREE.AxesHelper(50);
      scene.add(as);
      // 创建圆形
      const geometry = new THREE.SphereGeometry(130, 100, 100);
      geometry.scale(-1, 1, 1);
      // 加载贴图
      const textureLoader = new THREE.TextureLoader();
      const texture1 = textureLoader.load(scene1);
      const texture2 = textureLoader.load(scene2);
      this.texture1 = texture1;
      this.texture2 = texture2;
      // 贴图
      const material = new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide });
      this.material = material;
      // 几何体
      const cube = new THREE.Mesh(geometry, material);
      // 将几何体加入到场景中
      scene.add(cube);
      // 渲染器
      const renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      // 设置渲染器宽高
      renderer.setSize(elWidth, elHeight);
      // 将渲染的dom添加到容器中
      document.querySelector("#container").replaceChildren(renderer.domElement);
      // 相机控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      console.log(camera.position);
      this.controls = controls
      // 设置控制器鼠标滚轮滚动速度
      controls.zoomSpeed = 5;
      //相机轨道的最小视距
      controls.minDistance = 0;
      //相机轨道的最大视距
      controls.maxDistance = 30;
      // 是否自动横向滚动
      controls.autoRotate = false;
      // 自动横向滚动的速度
      controls.autoRotateSpeed = 0.9;
      // 禁止鼠标右键横向移动
      controls.enablePan = false;
      // 设置鼠标左键横向移动时阻尼
      controls.enableDamping = true;
      // 设置鼠标左键旋转时的速度
      controls.rotateSpeed = 0.5;
      // 向下最大角度 -> 0 - 90
      controls.minPolarAngle = Math.PI / 180;
      // 向上最大角度 -> 90 - 180
      controls.maxPolarAngle = Math.PI;
      // 渲染函数
      function animation() {
        stats.update();
        controls.update();
        // 渲染器渲染场景及相机
        renderer.render(scene, camera);
        requestAnimationFrame(animation);
      }
      // 设置resize
      window.addEventListener("resize", () => {
        // 设置相机宽高
        camera.aspect = window.innerWidth / window.innerHeight;
        // 更新相机
        camera.updateProjectionMatrix();
        // 渲染器的宽高
        renderer.setSize(window.innerWidth, window.innerHeight);
        //像素
        renderer.setPixelRatio(window.devicePixelRatio);
      });

      // 双击全屏
      window.addEventListener("dblclick", () => {
        const fullScreen = document.fullscreenElement;
        fullScreen
          ? document.exitFullscreen()
          : document.body.requestFullscreen();
      });
      animation();
    },
    // 处理切换场景
    handleChangeScene(i) {
      // 切换场景贴图
      this.material.map = i === 1 ? this.texture1 : this.texture2;
    },
    // 处理应用角度
    handleSave(){
      const oneDegree = Math.PI / 180
      this.controls.minPolarAngle = (90 + this.value[0]) * oneDegree
      this.controls.maxPolarAngle = (this.value[1] + 90) * oneDegree
    }
  },
};
</script>

<style lang="less" scoped>
.btn-list {
  position: fixed;
  right: 0;
  top: 10px;
  z-index: 9;
  display: flex;
  align-items: center;
}
button {
  width: 120px;
  height: 35px;
  line-height: 35px;
  border: none;
  background-color: #409eff;
  color: #fff;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 6px;
}
.el-ui {
  position: fixed;
  top: 10px;
  right: 400px;
  width: 300px;
}
.more-link {
  font-size: 20px;
  text-decoration: none;
  color: red;
}
</style>