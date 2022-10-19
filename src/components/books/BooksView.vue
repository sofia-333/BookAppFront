<template>
  <div class="text-color">
    <b-sidebar id="isbn-sidebar" aria-labelledby="sidebar-no-header-title" z-index='50' shadow class="no-header">
      <div class="p-3 text-color">
        <h5 id="sidebar-no-header-title"><strong>ISBN</strong></h5>
        <p>
          An ISBN is an International Standard Book Number. ISBNs were 10 digits in length up to the end of December
          2006,
          but since 1 January 2007 they now always consist of 13 digits. ISBNs are calculated using a specific
          mathematical formula and include a check digit to validate the number.
          Each ISBN consists of 5 elements with each section being separated by spaces or hyphens. Three of the five
          elements may be of varying length:
        </p>
        <ul>
          <li> Prefix element – currently this can only be either 978 or 979. It is always 3 digits in length</li>
          <li>Registration group element – this identifies the particular country, geographical region, or language
            area
            participating in the ISBN system. This element may be between 1 and 5 digits in length
          </li>
          <li>Registrant element - this identifies the particular publisher or imprint. This may be up to 7 digits in
            length
          </li>
          <li>Publication element – this identifies the particular edition and format of a specific title. This may be
            up to 6
            digits in length
          </li>
          <li>Check digit – this is always the final single digit that mathematically validates the rest of the
            number.
            It is
            calculated using a Modulus 10 system with alternate weights of 1 and 3.
          </li>
        </ul>
        <a href="https://www.isbn-international.org/content/what-isbn">Read more about ISBN</a>
      </div>
    </b-sidebar>
    <div class="mb-3 d-flex justify-content-end header-buttons">
      <input type="text" v-model="isbn" placeholder="ISBN" name="ISBN" class="form-control isbn-input"/>
      <b-button class="me-1 btn" @click="getBookData" :disabled="!isbn">Search Book</b-button>
      <b-button v-b-toggle.isbn-sidebar class="me-2 btn">What is ISBN?</b-button>
    </div>
    <div v-if="!book" class="book-container">
      <div class="p-2 pl-5">
        <h4>Search for your book easily using ISBN 10 or 13!</h4>
      </div>
      <img alt="" src="../../assets/books.png" class="main-image">
    </div>
    <div v-else>
      <div v-if="loading" class="spinner">
        <b-spinner variant="info" style="width: 3rem; height: 3rem;"></b-spinner>
      </div>
      <b-card v-else class="book-content">
        <template #header>
          <h4 class="mb-0">{{ book.title }}</h4>
        </template>
        <div class="d-flex mb-4">
          <img v-if="book.cover_url" :src="`${book.cover_url}`" alt="Image" class="image">
          <img v-else src="../../assets/coverNotAvailable.png" alt="Image" class="image">
          <div class="mx-3">
            <p v-if="book.isbn_10">ISBN 10: {{ book.isbn_10 }}</p>
            <p v-if="book.isbn_13">ISBN 13: {{ book.isbn_13 }}</p>
            <p v-if="book.publish_date">Publish Date: {{ book.publish_date }}</p>
            <p v-if="book.number_of_pages">Number of Pages: {{ book.number_of_pages }}</p>
            <p v-if="book.notes">Notes: {{ book.notes }}</p>
          </div>
        </div>
        <list-info :items="book.publishers" :title="'Publishers'"></list-info>
        <list-info :items="book.publish_places" :title="'Publishers'"></list-info>
        <list-info :items="book.subject_people" :title="'Subject People'"></list-info>
        <list-info :items="book.subject_places" :title="'Subject Places'"></list-info>
        <list-info :items="book.subjects" :title="'Subjects'"></list-info>
        <list-info :items="book.links" :title="'Links'" :isLink="true"
                   :displayAttribute="'title'"></list-info>
      </b-card>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import mainService from "@/assets/js/service";
import ListInfo from "@/components/common/ListInfo";
import {ISBN_REGEX} from "@/assets/js/consts";
import handleErrors from "@/components/common/helperMethods";

export default {
  name: "BooksView.vue",
  components: {ListInfo},
  data() {
    return {
      visible: false,
      loading: false,
      isbn: null,
      book: null,
      ISBN_REGEX: ISBN_REGEX
    }
  },
  computed: {
    ...mapState({
      token: state => state.token,
      user: state => state.user,
    })
  },
  methods: {
    async getBookData() {
      this.loading = true
      let re = new RegExp(ISBN_REGEX);
      if (re.test(this.isbn)) {
        let response = await mainService.getBookData(this.isbn);
        if (response.success) {
          this.book = response.data;
          this.isbn = null;
        } else {
          await handleErrors(response, "Could not find the book.")
        }
      } else {
        this.$toast.error("Wrong ISBN number provided.");
      }
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.isbn-input {
  max-width: 250px;
  margin-right: 5px;
}

.header-buttons {
  margin-top: 70px
}

.book-content {
  max-width: 70%;
  margin: auto;
}

.image {
  max-width: 20%;
}

.text-color {
  color: #604935;
}

ul {
  padding-left: 16px;
}

.book-container {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  margin-top: 50px;
  border-radius: 24px;
  text-align: center;
  color: #604935;
  font-size: large;
}

.main-image {
  width: 100%;
  border-radius: 20px;
  border: #c4a57f 1px solid;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.btn {
  margin-top: 2px;
  height: 40px;
  background-color: #604935;
  color: white;
}

.spinner {
  margin-left: 50%;
  margin-top: 200px;
}

@media only screen and (max-width: 768px) {
  .book-container {
    width: 60%;
  }
}


</style>