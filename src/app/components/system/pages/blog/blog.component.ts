import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {BlogService} from '../../../../services/system/blog.service';
import {NzModalService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  loading = true;
  blogs: [];
  modalAgregarBlog = false;
  blogForm  = new FormGroup({
    blog_titulo: new FormControl(''),
    blog_imagen: new FormControl(''),
    blog_descripcion: new FormControl(''),
  });
  blogDelete;

  constructor(
      private router: Router,
      private location: Location,
      private route: ActivatedRoute,
      private blogService: BlogService,
      private modalService: NzModalService,
      private notification: NzNotificationService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe((data: any) => {
      this.blogs = data.data;
      this.loading = false;
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400) {
        this.router.navigate(['/auth/login']);
        this.notification.error('Error Inesperado', 'Por favor vuelve a iniciar Sesión');
      }
    });
  }

  showModal(): void {
    this.modalAgregarBlog = true;
  }

  handleCancelAgregar(): void {
    this.modalAgregarBlog = false;
  }

  createAttitude() {
    const data = this.blogForm.value;
    console.log(data);
    this.blogService.save(data).subscribe((response: any) => {
      this.blogs = response.data;
      this.modalAgregarBlog = false;
      this.notification.success('Articulo', 'Articulo Creado con Éxito');
    }, (error) => {
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  delete(blogId) {
    this.blogDelete = blogId;
    this.modalService.confirm({
      nzTitle: '<i>¿Estás seguro de realizar esta acción?</i>',
      nzContent: '<b>Esta acción no se puede deshacer</b>',
      nzCancelText: 'Cancelar',
      nzOkText: 'Eliminar',
      nzClassName: 'modal-confirm-delete',
      nzOnOk: () => this.confirmDelete()
    });
  }

  confirmDelete() {
    this.blogService.delete(this.blogDelete).subscribe((data: any) => {
      this.blogs = data.data;
      this.notification.success('Articulo', 'El articulo fue eliminado con exito');
    }, (error) => {
      console.log(error);
      if (error.status === 401) {
        this.router.navigate(['/auth/login']);
      } else if (error.status === 400 || error.status === 500) {
        this.notification.error('Error al Eliminar el articulo', error.error.message);
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
