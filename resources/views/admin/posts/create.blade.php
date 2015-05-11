@extends('admin.layout')

@section('title', 'New Post')

@section('content')
    <div role="tabpanel">

        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#text" aria-controls="text" role="tab" data-toggle="tab">Text</a></li>
            <li role="presentation"><a href="#live" aria-controls="live" role="tab" data-toggle="tab">Live</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="text">
                <textarea name="postText" id="txaPostText" cols="30" rows="10" class="txaPostText"></textarea>
            </div>
            <div role="tabpanel" class="tab-pane" id="live">
                <div class="col-lg-6 col-md-6">
                    <textarea name="postLive" id="txaPostLive" cols="30" rows="10" class="txaPostText"></textarea>
                </div>
                <div class="col-lg-6 col-md-6">asdgasdg</div>
            </div>
        </div>

    </div>
@stop

@section('assets_bottom')
    <script type="text/javascript" src="/js/posts.js"></script>
@stop