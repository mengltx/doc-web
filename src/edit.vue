<template>
  <div class="container">
    <div class="handle-box">
      <el-form ref="formInline" :inline="true" :model="formInline" :rules="rules" class="demo-form-inline">
        <el-form-item label="标题" required prop="title">
          <el-input v-model="formInline.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="目录" required prop="directory">
          <el-select v-model="formInline.directory" placeholder="目录:">
            <template v-for="directory in directorys">
              <el-option :label="directory.name" v-bind:key="directory.id" :value="directory.id"></el-option>
            </template>
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formInline.order" placeholder="序号:"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button  @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="main">
      <mavon-editor
        :toolbars="toolbars"
        v-model="content"
        @save="saveDcoument"
        @change="changeData"
        ref="md"
        @imgAdd="$imgAdd"
      />
    </div>
  </div>
</template>
<script>
import bus from "./component/bus.js";
export default {
  data() {
    return {
      docId: "",
      formInline: {
        title: '',
        directory: '',
        order: 99
      },

      rules:{
        title:[
          { required: true, message: '请填入标题', trigger: 'blur' },
        ],
        directory:
        [
          { required: true, message: '请选择', trigger: 'blur' },
        ]
      },
      value: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      content: "",
      render: "",
      directorys: []
    };
  },
  methods: {
    changeData(content, render) {
      this.content = content;
      this.render = render;
    },
    submitForm(){
      this.$refs.formInline.validate((valid) => {
          if (valid) {
            this.saveDcoument();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    saveDcoument() {
      if (this.docId === "" || this.docId == null || this.docId === undefined) {
        this.$post("/doc-api/article/", {
          title: this.formInline.title,
          order: this.formInline.order,
          directory: this.formInline.directory,
          content: this.content,
          render: this.render
        }).then(response => {
          if (response.code === 0) {
            //success
            this.docId = response.data.id;
            //todo 弹框
            this.$success('success');
          }
        });
      }else{
        this.$put('/doc-api/article/',{
          id:this.docId,
          title: this.formInline.title,
          order: this.formInline.order,
          directory: this.formInline.directory,
          content: this.content,
          render: this.render
        }).then(response=>{
          if(response.code===0){
            this.docId= response.data.id;
            this.$success('success');
          }
        })
      }
    },
    back() {
      this.$router.push("/");
    },
    listDirectory() {
      this.$get("/doc-api/menus/directory").then(response => {
        this.directorys = response.data;
      });
    },
    $imgAdd(pos, $file) {
      const formData = new FormData();
      formData.append("file", $file);
      this.$post(
        "/doc-api/file/image/",
        formData,
        {},
        "multipart/form-data"
      ).then(response => {
        this.$refs.md.$img2Url(pos, response);
      });
    }
  },
  mounted() {
    this.listDirectory();
  }
};
</script>
<style>
</style>

