<template>
    <div class="card" >
        <div class="card-image">
            <img @click="goToTeacherTopicProfile"  class="pointer topic-img" :src="teacherTopic.topicImage" />
            <a @click="goToTeacherProfile"  class="teacher-img btn-floating  waves-effect waves-light btn-large"><img
            :src="teacherTopic.teacher.img" /></a>
        </div>
            <p class="card-header font-bold">{{teacherTopic.topic.subtitle}} - {{teacherTopic.teacher.fullName}} </p>
        <div class="card-content">
            <p><span class="font-bold">Level: </span>{{teacherTopic.level}} - {{teacherTopic.pricePerHour}}$/perHour</p>
            <p>{{teacherTopic.shortDes}}</p>
            <StarRating v-model="teacherTopic.rating" :star-size="15" :read-only="true" :show-rating="false"/>
            <div class="flex justify-start align-center" v-if="showEdit">
              <!-- class="waves-effect waves-teal btn-flat" -->
                <a class="btn-flat" @click="$emit('toEdit', teacherTopic)"><i class="fa fa-pencil-square-o"></i></a>
                <a class="btn-flat" @click="deleteClass"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                
            </div>
            <div v-if="showLongDesc">
                <p class="long-desc">{{teacherTopic.longDes}}</p>
            </div> 
        </div>
        
    </div>
</template>

<script>
import StarRating from "vue-star-rating";
export default {
  name: "TeacherTopicPreview",
  props: {
    teacherTopic: null,
    showTeacher: { default: true },
    showLongDesc: { default: true },
    showEdit: { default: false }
  },
  data() {
    return {};
  },
  computed: {},
  components: {
    StarRating
  },
  methods: {
    goToTeacherProfile() {
      if (this.showTeacher)
        this.$router.push("/profile/user/" + this.teacherTopic.teacherId);
    },
    goToTeacherTopicProfile() {
      this.$router.push("/profile/topic/" + this.teacherTopic._id);
    },

    deleteClass() {
      this.$dialog
        .confirm("Are you sure?", {
          loader: true 
        })
        .then(dialog => {
          this.$store
            .dispatch({
              type: "deleteTeacherTopic",
              teacherTopicId: this.teacherTopic._id,
              teacherId: this.teacherTopic.teacherId
            })
            .then(deleted => {
              dialog.close();
            })
            .catch(err => {
            dialog.close();
            });
         
        })
        .catch(() => {
          console.log("Delete aborted");
        });
    }
  }
};
</script>

<style scoped>
.card {
  width: 90vw;
  text-align: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 10px auto;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.topic-img {
  height: 275px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
}

.vue-star-rating {
  width: 100%;
  justify-content: start;
}

.long-desc {
  max-height: 60px;
  overflow: hidden;
}

.card .card-image {
  height: 300px;
  text-align: center;
}

a.teacher-img {
  top: -33px;
  width: 66px;
  height: 66px;
}
a.teacher-img img {
  height: 100%;
}

.card .card-content {
  padding: 0 5px;
  font-size: 14px;
}

.card-header {
    margin: 20px 0 0;
    padding: 0 5px;
    font-size: 14px;
}

@media (min-width: 750px){
    .card {
        width: 250px;   
        /* margin:0; */
    } 

    .topic-img {
            height: 150px;
    }

    .card .card-image {
        height: 200px;
    }

    .card-header {
    margin-top: 0;
    }

    .btn-flat {
      padding: 0 5px;
    }

    .btn-flat:hover {
        color: #ababab;
    }
}
</style>
