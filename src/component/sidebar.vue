<template>
  <div class="sidebar">
    <div style="padding:10px" class="btnBackground">
      <el-button  size="small" @click="addDirectory">新建目录</el-button>
      <el-button  size="small" @click="addDocument">新增文档</el-button>
    </div>
    <el-menu
      class="sidebar-el-menu"
      :collapse="collapse"
      :router="false"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      default-active="curActive"
      unique-opened
      @select="select"
    >
      <template v-for="item in items">
        <template v-if="item.directory">
          <el-submenu :index="item.id" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.sub">
              <el-submenu v-if="subItem.directory" :index="subItem.id" :key="subItem.id">
                {{subItem}}
                <template slot="title">{{ subItem.name }}</template>
              </el-submenu>
              <el-menu-item v-else :index="subItem.docId" :key="subItem.docId">{{ subItem.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.docId" :key="item.docId">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    {{curActive}}
  </div>
</template>

<script>
//import bus from '../common/bus';
import bus from "./bus.js";

export default {
  data() {
    return {
      collapse: false,
      curActive: "",
      items: [
        {
          id: "5c18a8632771470033f19e0a",
          parentId: null,
          sub: [
            {
              id: "5c18a87f2771470033f19f07",
              parentId: null,
              sub: [],
              name: "受试者随机",
              directory: false,
              docId: "1111",
              order: null
            },
            {
              id: "5c22f473dffbab337d6e421d",
              parentId: null,
              sub: [],
              name: "紧急揭盲",
              directory: false,
              docId: "2222",
              order: null
            },
            {
              id: "5c22f4d9dffbab337d6e421e",
              parentId: null,
              sub: [],
              name: "中心药房",
              directory: false,
              docId: "33333",
              order: null
            }
          ],
          name: "随机试验",
          directory: true,
          docId: null,
          order: null
        },
        {
          id: "5c18a8632771470033f19e14",
          parentId: null,
          sub: [],
          name: "项目管理",
          directory: true,
          docId: null,
          order: null
        },
        {
          id: "5c18a8632771470033f19e1e",
          parentId: null,
          sub: [],
          name: "项目构建",
          directory: false,
          docId: "4444",
          order: null
        }
      ]
    };
  },
  methods: {
    select(index) {
      bus.$emit("index", index);
    },
    addDocument() {
      this.$router.push("/edit");
    },
    addDirectory() {
      this.$router.push("/directory");
    },
    menuTree() {
      this.$get("/doc-api/menus").then(response => {
        this.items = response.data;
       
          if (this.items[0].directory) {
            bus.$emit("index", this.items[0].sub.length>0? this.items[0].sub[0].docId:'');
          } else {
            bus.$emit("index", this.items[0].docId);
          }
        
      });
    },

    
  },
  computed: {
    /* onRoutes(){
                //return this.$route.path.replace('/','');
                //alert(JSON.stringify(items[0]));
            } */
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    /* bus.$on('collapse', msg => {
                this.collapse = msg;
            }) */

    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

    bus.$on("docId", msg => {
      this.curActive = msg;
    });
  },
  mounted() {
    this.menuTree();
    console.log(this.curActive);
  }
};
</script>

<style scoped>
.btnBackground {
  background-color: #324157;
}
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
.bthgroup {
  display: block;
}
</style>