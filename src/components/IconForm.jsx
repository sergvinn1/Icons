import { Formik, Form } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { nanoid } from "nanoid";
import * as Yup from "yup";

const IconForm = ({ addIcon }) => {
  const validationSchema = Yup.object({
    name: Yup.string().min(3).max(50).required("Name is required"),
    number: Yup.string().min(3).max(50).required("Number is required"),
    clothes: Yup.string().required("Clothes number is required"),
  });

  return (
    <Formik
      initialValues={{ name: "", number: "", clothes: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const newIcon = {
          id: nanoid(),
          ...values,
        };
        addIcon(newIcon);
        resetForm();
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Назва ікони"
              variant="outlined"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Номер ікони"
              variant="outlined"
              name="number"
              value={values.number}
              onChange={handleChange}
              error={touched.number && Boolean(errors.number)}
              helperText={touched.number && errors.number}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Номер шафи"
              variant="outlined"
              name="clothes"
              value={values.clothes}
              onChange={handleChange}
              error={touched.clothes && Boolean(errors.clothes)}
              helperText={touched.clothes && errors.clothes}
            />
          </Box>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Додати ікону
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default IconForm;
