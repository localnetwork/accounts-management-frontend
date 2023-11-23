const { createApp } = Vue;

createApp({
  data() {
    return {
      formData: {
        first_name: {
          id: "first_name",
          label: "First Name",
          type: "text",
          fieldType: "input",
          value: "",
        },
        last_name: {
          id: "last_name",
          label: "Last Name",
          fieldType: "input",
          type: "text",
          value: "",
        },
        email: {
          id: "email",
          label: "Email",
          fieldType: "input",
          type: "email",
          value: "",
        },
        password: {
          id: "password",
          label: "Password",
          fieldType: "input",
          type: "password",
          value: "",
        },
        confirm_password: {
          id: "confirm_password",
          label: "Confirm Password",
          fieldType: "input",
          type: "password",
          value: "",
        },
      },
      errors: [],
      responseMessage: "",
    };
  },
  methods: {
    async save() {
      const data = new FormData();
      data.append("method", "createUser");
      // Iterate through the formData keys
      for (const key in this.$data.formData) {
        if (
          this.$data.formData.hasOwnProperty(key) &&
          key !== "errors" &&
          key !== "responseMessage"
        ) {
          // Append the field's id and value to the FormData
          data.append(key, this.$data.formData[key].value);
        }
      }

      //   fetch("http://localhost:49155/handler/router.php", {
      //     method: "POST",
      //     body: data,
      //   }).then((res) => {
      //     if (res.status == 200) {
      //       this.formClear();
      //     } else {
      //       console.log("elseeee");
      //     }
      //   });

      try {
        const response = await fetch(
          "http://localhost:49155/handler/router.php",
          {
            method: "POST",
            body: data,
          }
        );

        if (response.ok) {
          this.formClear();
        } else {
          const responseData = await response.json();
          console.log(responseData);
          if (responseData.errors) {
            this.errors = responseData.errors;
          } else {
            console.error("Server Error:", responseData.message);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    formClear() {
      // Iterate through the keys of this.formData
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key].value = "";
        }
      }

      // Clear any previous errors
      this.errors = {};
      this.responseMessage = "";
    },
  },
  created() {},
}).mount("#home");
