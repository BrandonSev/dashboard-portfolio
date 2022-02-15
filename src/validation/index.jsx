import * as Yup from "yup";

const projectValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Le titre doit faire au minimum 5 caractères")
    .required("Ce champ est obligatoire"),
  description: Yup.string()
    .min(20, "La description doit faire au minimum 20 caractères")
    .required("Ce champ est obligatoire"),
  start_date: Yup.date().required("Ce champ est obligatoire"),
  end_date: Yup.date().required("Ce champ est obligatoire"),
  tags: Yup.string().required("Ce champ est obligatoire"),
  url: Yup.string().required("Ce champ est obligatoire"),
});

const imagesValidationSchema = Yup.object().shape({
  images: Yup.mixed().required("Ce champ est obligatoire"),
  project_id: Yup.number()
    .min(1, "Veuillez séléctionner un projet")
    .required("Ce champ est obligatoire"),
});

const categoryValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Le titre doit faire au minimum 3 caractères")
    .required("Ce champ est obligatoire"),
});

const underCategoryValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Le titre doit faire au minimum 3 caractères")
    .required("Ce champ est obligatoire"),
  category_id: Yup.number()
    .min(1, "Veuillez choisir une catégorie")
    .required("Ce champ est obligatoire"),
});

export const technologyValidationSchema = Yup.object().shape({
  logo: Yup.mixed().required("Le logo est obligatoire"),
  title: Yup.string().required("Ce champ est obligatoire"),
  category_id: Yup.number()
    .min(1, "Veuillez choisir une catégorie")
    .required("Ce champ est obligatoire"),
  under_category_id: Yup.number()
    .min(1, "Veuillez choisir une sous-catégorie")
    .required("Ce champ est obligatoire"),
});

export {
  projectValidationSchema,
  imagesValidationSchema,
  categoryValidationSchema,
  underCategoryValidationSchema,
};
