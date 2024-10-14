<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import novelData from '../assets/novel.json';

const route = useRoute();

const currentChapter = ref<{ title: string; content: string } | null>(null);

const loadChapterContent = async (chapterNumber: number) => {
  const chapter = novelData.chapters.find(ch => ch.number === chapterNumber);
  if (chapter) {
    try {
      const module = await import(`../assets/chapters/${chapterNumber}.txt?raw`);
      currentChapter.value = { title: chapter.title, content: module.default };
    } catch (error) {
      console.error('Error loading chapter content:', error);
      currentChapter.value = { title: chapter.title, content: '加载章节内容时出错。' };
    }
  } else {
    currentChapter.value = null;
  }
};

watch(() => route.params.chapterNumber, (newChapterNumber) => {
  if (newChapterNumber) {
    loadChapterContent(parseInt(newChapterNumber as string, 10));
  } else {
    loadChapterContent(1);
  }
}, { immediate: true });
</script>

<template>
  <div class="chapter-content" v-if="currentChapter">
    <h1>{{ currentChapter.title }}</h1>
    <p>{{ currentChapter.content }}</p>
  </div>
</template>

<style scoped>
.chapter-content {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  line-height: 1.6;
  white-space: pre-wrap;
}
</style>