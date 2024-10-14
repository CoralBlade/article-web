<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TableOfContents from './components/TableOfContents.vue';
import ChapterContent from './components/ChapterContent.vue';
import novelData from './assets/novel.json';

const route = useRoute();
const router = useRouter();

const isSidebarOpen = ref(false);
const currentChapter = ref(1);

const updateChapter = (chapterNumber: string | string[] | undefined) => {
  const newChapter = chapterNumber ? parseInt(chapterNumber as string, 10) : 1;
  if (newChapter >= 1 && newChapter <= novelData.chapters.length) {
    currentChapter.value = newChapter;
  } else {
    router.replace('/1');
  }
};

watch(() => route.params.chapterNumber, updateChapter, { immediate: true });

onMounted(() => {
  updateChapter(route.params.chapterNumber);
});

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const selectChapter = (chapterNumber: number) => {
  router.push(`/${chapterNumber}`);
  isSidebarOpen.value = false;
};
</script>

<template>
  <div class="novel-website">
    <button @click="toggleSidebar" class="sidebar-toggle">
      {{ isSidebarOpen ? '关闭目录' : '打开目录' }}
    </button>
    <TableOfContents
      :isOpen="isSidebarOpen"
      :currentChapter="currentChapter"
      @selectChapter="selectChapter"
    />
    <ChapterContent :chapterNumber="currentChapter" />
  </div>
</template>

<style>
.novel-website {
  display: flex;
  height: 100vh;
}

.sidebar-toggle {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
}
</style>