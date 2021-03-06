<?php

use Illuminate\Http\Response as HttpResponse;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//header("Access-Control-Allow-Credentials: true");
//header("Access-Control-Allow-Origin: http://localhost:4200");
//header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix'=> 'api','middleware'=>'cors'], function(){
    Route::post('/auth_login', 'ApiAuthController@userAuth');
    Route::get('/secure', 'secure@hola');
    Route::resource('profesor.disponibilidad','ProfeDispoController',['exept'=>['show']]);

    Route::resource('profesores','TeacherController',['only'=>['index','show']]);
    //Route::resource('/secure','secure@index');
});

Route::resource('test','test',['only' =>['index']]);


/*Route::group(['prefix' => 'test'], function(){
  Route::resource('auth', 'ApiAuthController',['only'=>['index']]);
  Route::post('auth', 'ApiAuthController@userAuth');
});*/
//Route::resource('secure','secure',['only'=>['index','show']]);
Route::get('/restricted', [
   'before' => 'jwt-auth',
   function () {
       $token = JWTAuth::getToken();
       $user = JWTAuth::toUser($token);

       return Response::json([
           'data' => [
               'email' => $user->email,
               'registered_at' => $user->created_at->toDateTimeString()
           ]
       ]);
   }
]);

/*Route::group(['prefix'=>'api'], function(){
  Route::get('/secure', 'secure@hola');
});*/
/*Route::group(['prefix'=>'api'], function(){
  Route::get('/secure', function(){
    try {
      JWTAuth::parseToken()->toUser();
    } catch (Exception $e){
      return Response::json(['error'=> $e->getMessage(), HttpResponse::HTTP_UNAUTHORIZED]);
    }
    return Response::json(['data' => 'dadasdasd']);
  });
});*/
