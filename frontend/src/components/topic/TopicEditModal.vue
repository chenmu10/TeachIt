<template>
<section>
  <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
            <div class="modal-header">
            <div style="float:right; font-size: 30px; cursor: pointer;" @click="$emit('modalClosed')">&times;</div>
            <slot name="header">
              Edit Class Details
            </slot>
          </div>
        <div class="modal-body">
          <slot name="body">
            <TeacherTopicEdit @emitToModal="emitToList" :teacherClass="teacherClass"></TeacherTopicEdit>
          </slot>
        </div>
      <div class="modal-footer">
          <slot name="footer">
          </slot>
        </div>
        </div>
      </div>
    </div>
  </transition>
</section>
</template>

<script>
import TeacherTopicEdit from "@/components/topic/TeacherTopicEdit.vue";

export default {
  data() {
    return {
    };
  },

  props: ["showModal",'teacherClass'],
  watch: {},
  computed: {},
 
  methods: {
    emitToList(teacherClassToEdit) {
      this.$emit("toSave", teacherClassToEdit);
    }
  },
  components: {
    TeacherTopicEdit
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 500px;
  height: 100vh;
  overflow-y: scroll;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>