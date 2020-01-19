<template>
  <Layout>
    <h1>{{ article.title }}</h1>
    <small>Created at {{ article.created }}</small>
    <hr>
    <div v-html="article.content" />
  </Layout>
</template>

<page-query>
query ($path: String!) {
  article: articles(path: $path) {
    id
    title
    path
    excerpt
    content
    created (format: "YYYY年MM月DD日 HH:mm")
  }
}
</page-query>

<script>
export default {
  name: 'article-template',
  computed: {
    article() {
      return this.$page.article
    }
  }
}
</script>
