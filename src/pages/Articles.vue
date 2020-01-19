<template>
  <Layout>
    <Pager
      class="pagination"
      :info="$page.articles.pageInfo"
    />
    <ul>
      <li v-for="article in articles" :key="article.id">
        <g-link :to="article.path">[{{ article.created }}] {{ article.title }}</g-link>
      </li>
    </ul>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  articles: allArticles (sortBy: "created", perPage: 3, page: $page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        path
        title
        created (format: "YYYY年MM月DD日 HH:mm")
      }
    }
  }
}
</page-query>

<script>
import { Pager } from 'gridsome'

export default {
  name: 'articles-page',
  components: {
    Pager
  },
  computed: {
    articles() {
      return this.$page.articles.edges.map(article => {
        return article.node
      })
    },
    pageInfo() {
      return this.$page.articles.pageInfo
    }
  }
}
</script>

<style scoped>
.pagination {
  width: 400px;
  margin: 0 auto;
}
.pagination a {
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  text-decoration: none;
}
a.active {
  background-color: pink;
}
</style>