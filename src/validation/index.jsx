import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Le titre doit faire au minimum 5 caractères")
    .required("Ce champ est obligatoire"),
  description: Yup.string()
    .min(20, "La description doit faire au minimum 20 caractères")
    .required("Ce champ est obligatoire"),
  start_date: Yup.date().required("Ce champ est obligatoire"),
  end_date: Yup.date().required("Ce champ est obligatoire"),
  tags: Yup.string().required("Ce champ est obligatoire"),
});
