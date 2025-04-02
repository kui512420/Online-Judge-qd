<template>
  <div>
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
      <a-select v-model="options" :style="{ width: '120px' }" placeholder="查询条件">
        <a-option>ID</a-option>
        <a-option>账号</a-option>
        <a-option>邮箱</a-option>
      </a-select>
      <a-input-search v-model="searchData" @click="search" :style="{ width: '320px' }" placeholder="请输入数据"
        search-button />
      <a-button status="warning">
        <template #icon>
          <icon-download></icon-download>
        </template>
        导出
      </a-button>

      <a-button type="primary" status="danger">
        批量删除
      </a-button>

      <a-button type="dashed" @click="reset">
        重置
      </a-button>
    </div>
    <a-table :columns="columns" row-key="key" :data="dataSource" column-resizable :bordered="{ cell: true }" :pagination="false"
      :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" >
      <template #id="{ record }">
        <a-trigger class="ellipsis" position="top" auto-fit-position :unmount-on-close="false">
          <div>{{ record.id }}</div>
          <template #content>
            <div class="demo-basic">
              {{ record.id }}
            </div>
          </template>
        </a-trigger>
      </template>
      <template #userAvatar="{ record }">
        <a-image width="70" :src="'http://127.0.0.1:5210/' + record.userAvatar" style="border-radius: 50%;"></a-image>
      </template>
      <template #userRole="{ record }">
        <a-tag :bordered="true" :color="record.userRole === 'admin' ? 'blue' : record.userRole === 'ban' ? 'red' : ''">
          {{ record.userRole }}
        </a-tag>
      </template>
      <template #options="{ record }">
        <!-- 新增操作按钮 -->
        <div style="width: 50%; display: flex; align-items: center; justify-content: space-around;">
          <a-button size="small" @click="edit(record)" type="outline">
            <template #icon>
              <icon-edit />
            </template>
            编辑
          </a-button>
          <a-button size="small" @click="del(record)" type="outline" status="danger" style="margin: 0 5px;">
            <template #icon>
              <icon-delete />
            </template>
            删除
          </a-button>
          <a-dropdown position="bottom">
            <a-button type="dashed" size="small">
              <template #icon>
                <icon-double-down />
              </template>
              更多操作
            </a-button>
            <template #content>
              <a-doption><a-button type="primary" shape="round">禁用</a-button></a-doption>
              <a-doption><a-button type="primary" shape="round">启用</a-button></a-doption>
            </template>
          </a-dropdown>
        </div>
      </template>
    </a-table>

    <a-pagination style="justify-content: center; margin-top: 10px;" v-model:page-size="pageSize" :default-page-size="5"
      :page-size-options="pageSizes" @change="change" :total=pagination.total show-total show-jumper show-page-size />

    <a-drawer :width="440" v-if="userInfo" ok-text="保存" :hide-cancel=true :visible="visible" @cancel="handleCancel"
      unmountOnClose>
      <template #title>
        用户信息
      </template>
      <div style="height: 100vh;  display: flex; flex-direction: column; justify-content: space-between;">
        <div class="info-item">
          <div>id:</div><a-input disabled v-model="userInfo.id" :style="{ width: '320px' }" default-value="content"
            placeholder="Please enter something" allow-clear />
        </div>
        <div class="info-item">
          <div>账号:</div><a-input disabled v-model="userInfo.userAccount" :style="{ width: '320px' }"
            default-value="content" placeholder="Please enter something" allow-clear />
        </div>
        <div class="info-item">
          <div>密码:</div><a-input v-model="userInfo.userPassword" :style="{ width: '320px' }" default-value="content"
            placeholder="Please enter something" allow-clear />
        </div>
        <div class="info-item">
          <div>名称:</div><a-input v-model="userInfo.userName" :style="{ width: '320px' }" default-value="content"
            placeholder="Please enter something" allow-clear />
        </div>
        <div class="info-item">
          <div>头像:</div> <a-upload :show-file-list="false">
            <template #upload-button>
              <a-avatar>
                <img alt="avatar" style="width: 100%; height: 100%;" :src=userInfo.userAvatar />
              </a-avatar>
            </template>
          </a-upload>
        </div>
        <div class="info-item">
          <div>邮箱:</div><a-input :style="{ width: '320px' }" v-model="userInfo.email" default-value="content"
            placeholder="Please enter something" allow-clear />
        </div>
        <div class="info-item">
          <div>角色:</div>
          <a-radio v-model="userInfo.userRole" value="user">普通用户</a-radio>
          <a-radio v-model="userInfo.userRole" value="admin">管理员</a-radio>
          <a-radio v-model="userInfo.userRole" value="ban">禁用</a-radio>
        </div>
        <div class="info-item">
          <div>注册时间:</div><a-input disabled v-model="userInfo.createTime" :style="{ width: '320px' }"
            default-value="content" placeholder="Please enter something" allow-clear />
        </div>
        <div class="info-item">
          <div>最新登录时间:</div><a-input disabled v-model="userInfo.updateTime" :style="{ width: '320px' }"
            default-value="content" placeholder="Please enter something" allow-clear />
        </div>
      </div>
    </a-drawer>


  </div>

</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { IconDownload, IconEdit, IconDoubleDown, IconDelete } from '@arco-design/web-vue/es/icon';
import { UserControllerService } from '@/generated';
import { Message } from '@arco-design/web-vue';
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});
const pagination = reactive({
  total: 0
})
const pageSize = ref(5)
const pageSizes = ref([5, 10, 20, 30, 50])

const searchData = ref("")
const visible = ref(false)
const visible2 = ref(false)
const options = ref()
const selectedKeys = ref([])
const columns = ref([
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    slotName: 'id',
    width: 120,
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    key: 'userAccount',
    width: 120,
    minWidth: 120,
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
    key: 'userAvatar',
    slotName: 'userAvatar',
    width: 60,
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    key: 'userName',
    width: 120,
    minWidth: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 190,
    minWidth: 190,
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    key: 'userRole',
    slotName: 'userRole',
    width: 70,
    minWidth: 70,
  },
  {
    title: '操作',
    slotName: 'options',

  },
]);
const userRole = ref()
const dataSource = ref([]);

// 用户信息
const userInfo = ref()
watch(pageSize, () => {
  userList()
})
const edit = (item) => {

  visible.value = true
  UserControllerService.getUserListUsingGet("", item.id, 1, 10, 1, "").then((res) => {
    if (res.code == 200) {
      userInfo.value = res.data.records[0]
    }
  })
}

const del = (item) => {
  UserControllerService.deleteUserUsingDelete(item.id).then((res) => {
    if (res.code == 200) {
      Message.success("删除成功！")
      userList()
    }
  })
}

const change = (e) => {
  UserControllerService.getUserListUsingGet("", 1, e, pageSize.value, 0, "").then((res) => {
    if (res.code == 200) {
      dataSource.value = res.data?.records
      pagination.total = res.data?.total ?? 0
    }
  })
}
const handleCancel = () => {
  visible.value = false;
}
const reset = () => {
  userList()
  options.value = ""
}
const userList = () => {

  UserControllerService.getUserListUsingGet("", 0, 1, pageSize.value, 0, "").then((res) => {
    if (res.code == 200) {
      dataSource.value = res.data?.records
      pagination.total = res.data?.total ?? 0
    }
  })
}
const search = () => {
  if (searchData.value !== "") {
    if (options.value == "ID") {
      UserControllerService.getUserListUsingGet("", searchData.value, 1, 10, 1, "").then((res) => {
        if (res.code == 200) {
          dataSource.value = res.data?.records
          pagination.total = res.data?.total ?? 0
        }
      }).catch((e) => {
        Message.warning("参数异常")
      })
    } else if (options.value == "账号") {
      UserControllerService.getUserListUsingGet("", 1, 1, 10, 2, searchData.value).then((res) => {
        if (res.code == 200) {
          dataSource.value = res.data?.records
          pagination.total = res.data?.total ?? 0
        }
      }).catch((e) => {
        Message.warning("参数异常")
      })
    } else if (options.value == "邮箱") {
      UserControllerService.getUserListUsingGet(searchData.value, 1, 1, 10, 3, "").then((res) => {
        if (res.code == 200) {
          dataSource.value = res.data?.records
          pagination.total = res.data?.total ?? 0
        }
      }).catch((e) => {
        Message.warning("参数异常")
      })
    } else {

    }
  }

}
userList()
</script>
<style scoped>
.demo-basic {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.ellipsis {
  width: 100%;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info-item {
  display: flex;
  align-items: center;
}

.info-item div {
  margin-right: 5px;
}
</style>
