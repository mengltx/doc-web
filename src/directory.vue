<template>
  <div class="container" style="margin:15% 25% 25% ">
    <div class="left-items" style="float: left;">
      <el-button type="text" @click="openAdd">添加</el-button>
    </div>
    <div class="right-items" style="float: right;">
      <el-button type="text" @click="back">返回</el-button>
    </div>

    <el-table :data="directorys" border style="width: 100%">
      <el-table-column prop="name" label="目录名称"></el-table-column>
      <el-table-column prop="createTime" label="添加时间"></el-table-column>
      <el-table-column prop="order" label="序号"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="openEditor(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="openDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
    openEditor(row) {
      this.dialogFormVisible = true;
      //alert(JSON.stringify(row))
      this.form = { ...row };
      console.log(JSON.stringify(this.form));
    },
    doUpdate() {
      this.$put("/doc-api/menus/", this.form).then(response => {
        if (response.code === 0) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.listDirectory();
        }
      });
    },
    openDelete(row) {
      this.$confirm("确认删除目录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.doDeleteDir(row);
        })
        .catch(() => {});
    },
    doDeleteDir(row) {
      this.$del("/doc-api/menus/" + row.id)
        .then(response => {
          if (response.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.listDirectory();
          }
        })
        .catch(error => {});
    },
    back() {
      this.$router.push("/");
    },
    openAdd(){
      this.dialogFormVisible=true;
      this.form = {};
      
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
      this.directorys = [];
      this.$get("/doc-api/menus/directory").then(response => {
        response.data.forEach(it=>{
          this.directorys.push({
            ...it,createTime:this.$moment(it.createTime).format('YYYY-MM-DD hh:mm:ss')
          }) 
        });
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
