<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use \Michelf\Markdown;

class ParserController extends Controller {

	public function parse(Request $request)
    {
        $text = $request->input('text');
        $my_html = Markdown::defaultTransform($text);
        return $my_html;
    }


}
