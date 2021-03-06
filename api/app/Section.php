<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
  protected $table = 'sections';

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = ['nombre'];

  /**
   * The attributes excluded from the model's JSON form.
   *
   * @var array
   */
  protected $hidden = ['created_at','updated_at'];


}
