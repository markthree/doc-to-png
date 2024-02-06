<template>
  <div class="flex justify-end space-x-5 p-5">
    <UButton icon="i-heroicons-inbox" color="gray" @click="upload"
      >上传文档</UButton
    >
    <UButton icon="i-heroicons-photo" color="gray" @click="download"
      >下载图片</UButton
    >
  </div>

  <div class="text-gray-500 text-center" ref="preview">
    <p>
      <UIcon name="i-heroicons-light-bulb" />
      请先上传文档
    </p>
  </div>

  <UNotifications />
</template>

<script setup>
import { renderAsync } from "docx-preview"
import { saveAs } from "file-saver"
import { toBlob } from "dom-to-image"

const preview = ref(null)

let uploaded = false

const toast = useToast()

const name = ref("default")

function upload() {
  // 创建 file input
  const input = document.createElement("input")
  input.type = "file"
  // 让 file input 只能接收 docx 和 doc 格式
  input.accept = "docx,doc"
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
        uploaded = true
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
  if (!uploaded) {
    toast.remove("toast")
    toast.add({
      id: "toast",
      color: "orange",
      title: "请先上传文档",
    })
    return
  }

  toBlob(
    document.querySelector(
      "#__nuxt > div.text-gray-500.text-center > div > section"
    )
  ).then(function (blob) {
    saveAs(blob, `${name.value}.png`)
  })
}
</script>

<style>
#__nuxt > div.text-gray-500.text-center > div {
  background-color: transparent;
}

#__nuxt > div.text-gray-500.text-center > div > section {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>
