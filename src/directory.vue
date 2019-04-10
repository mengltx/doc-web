<template>
  <div class="container" style="margin:15% 25% 25% ">
    <div class="left-items" style="float: left;">
      <el-button type="text" @click="dialogFormVisible = true">添加</el-button>
    </div>
    <div class="right-items" style="float: right;">
      <el-button type="text" @click="back">返回</el-button>
    </div>

    <el-table :data="directorys" border style="width: 100%">
      <el-table-column prop="name" label="目录名称" width="180"></el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="180"></el-table-column>
      <el-table-column prop="order" label="序号"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>

    <el-dialog title="添加目录" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="目录名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="form.order" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDirectory">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        order: 99
      },
      formLabelWidth: "120px",
      directorys: []
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    addDirectory() {
      this.$post("/doc-api/menus/directory/add", this.form).then(response => {
        if (response.code === 0) {
          this.dialogFormVisible = false;
          this.listDirectory();
        }
      });
    },
    listDirectory() {
      this.$get("/doc-api/menus/directory").then(response => {
        this.directorys = response.data;
      });
    }
  },

  mounted() {
    this.listDirectory();
  }
};
</script>
<style scoped>
</style>
