<script setup lang="ts">
import { useRouter } from 'vue-router';
import novelData from '../assets/novel.json';

defineProps<{
  isOpen: boolean;
  currentChapter: number;
}>();

const router = useRouter();

const chapters = novelData.chapters;

const selectChapter = (chapterNumber: number) => {
  router.push(`/${chapterNumber}`);
};
</script>

<template>
  <div class="table-of-contents" :class="{ 'open': isOpen }">
    <h2>{{ novelData.title }} - 目录</h2>
    <ul>
      <li v-for="chapter in chapters" :key="chapter.number">
        <a
          href="#"
          @click.prevent="selectChapter(chapter.number)"
          :class="{ 'active': currentChapter === chapter.number }"
        >
          {{ chapter.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.table-of-contents {
  position: fixed;
  left: -250px;
  top: 0;
  width: 250px;
  height: 100%;
  background-color: #f0f0f0;
  transition: left 0.3s ease;
  overflow-y: auto;
  padding: 20px;
}

.table-of-contents.open {
  left: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #333;
}

a.active {
  font-weight: bold;
  color: #007bff;
}
</style>