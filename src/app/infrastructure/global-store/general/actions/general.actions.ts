import { createAction, props } from "@ngrx/store";
//import { Usuario } from "../../core/models/LoginResponse.model";
/* Accion para hacer login con datos de usuario para panel de administración */
export const mostrarCargando = createAction(
    '[ComunComponent] MOSTRAR CARGANDO',
    props<{ estado: boolean }>()
);

/* ************ Acciones para titulo de barra de navegacion ************* */
export const mostrarTituloNavBar= createAction(
    '[LayoutComponentv] MOSTRAR TITULO NAVBAR',
    props<{ titulo: string }>()
);

/* ************* Acciones para lista de opciones de menu ************** */
export const seleccionarOpcionMenu = createAction(
    '[LayoutComponent] SELECCIONAR OPCIONES DE MENU',
    props<{ url: string }>()
);

/* ************* Acciones para el indice de la lista de opciones del menu ************ */
export const seleccionarOpcionMenuIndice = createAction(
    '[LayoutComponent] SELECCIONAR OPCIONEs DE MENU INDICE',
    props<{ indice: number }>()
);

/* ************* Acciones paradatos de usuario ************ */
/* export const recuperarUsuario = createAction(
    '[LayoutComponent] RECUPERAR USUARIO DEL SISTEMA',
    props<{ usuario: Usuario }>()
); */
