import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(LoginService);
  const router = inject(Router);
  const token = authService.token;

  // Ajouter le token à la requête s'il existe
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Vérifier si l'erreur est due à un token expiré/invalide
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);

      }

      // Propager les autres erreurs
      return throwError(() => error);
    })
  );
};
