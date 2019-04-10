
<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{article.title}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <mavon-editor :subfiled="false" v-html="article.render"></mavon-editor>
          </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "./component/bus.js";
import vHead from "./component/header.vue";
import vSidebar from "./component/sidebar.vue";
export default {
  data() {
    return {
      article: {},
      docId: "",
      tagsList: [],
      collapse: false
    };
  },
  components: {
    vHead,
    vSidebar
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

    bus.$on("index", msg => {
      this.docId = msg;
    });

    //alert(this.$router.params.docId)
  console.log(this.$router)
  },
  methods: {
    findArticle(v) {
      if (v !== null && v !== undefined && v !== "") {
        this.$get("/doc-api/article/" + v).then(response => {
          if (response.code === 0) {
            this.article = response.data;
          }
        });
      }
    }
  },
  mounted(){
    
  },
  watch: {
    docId: {
      handler(v) {
        this.findArticle(v);
      }
    }
  }
};
</script>
