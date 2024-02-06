<template>
  <div class="flex justify-between items-center p-5">
    <Ad />
    <div class="flex justify-end space-x-5">
      <UButton icon="i-heroicons-inbox" color="gray" @click="upload">
        {{ uploaded ? "重新选择文档" : "选择文档" }}
      </UButton>
      <UButton
        icon="i-heroicons-photo"
        :color="Boolean(uploaded) ? 'cyan' : 'gray'"
        @click="download"
        >下载图片</UButton
      >
    </div>
  </div>

  <div
    class="text-gray-500 justify-center space-x-2 flex items-center"
    ref="preview"
  >
    <UIcon name="i-heroicons-light-bulb" />
    <span>请先上传文档</span>
  </div>

  <UNotifications />
</template>

<script setup>
import { renderAsync } from "docx-preview"
import fileSaver from "file-saver"
import domtoimage from "dom-to-image"

const preview = ref(null)

const uploaded = ref(false)

const toast = useToast()

const name = ref("default")

function upload() {
  // 创建 file input
  const input = document.createElement("input")
  input.type = "file"
  // 让 file input 只能接收 docx 和 doc 格式
  input.accept = ".docx, .doc"
  // 不支持多文件
  input.multiple = false
  // 不需要显示在页面中
  input.style.display = "none"

  input.onchange = (e) => {
    // 获取第一个文件
    const file = e.target.files[0]
    name.value = file.name.split(".")[0]
    renderAsync(file, preview.value)
      .then(() => {
        uploaded.value = true
      })
      .finally(() => {
        // 成功后移除 input
        input.remove()
      })
  }
  // 触发文件选择
  input.click()
}

function download() {
  if (!uploaded.value) {
    toast.remove("toast")
    toast.add({
      id: "toast",
      color: "orange",
      title: "请先上传文档",
    })
    return
  }

  domtoimage
    .toBlob(
      document.querySelector(
        "#__nuxt > div.text-gray-500.text-center > div > section"
      )
    )
    .then(function (blob) {
      fileSaver.saveAs(blob, `${name.value}.png`)
    })
}
</script>

<style>
#__nuxt > div.text-gray-500.justify-center.space-x-2.flex.items-center > div {
  background-color: transparent;
}

#__nuxt
  > div.text-gray-500.justify-center.space-x-2.flex.items-center
  > div
  > section {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>
