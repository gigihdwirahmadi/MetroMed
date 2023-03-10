<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Comment;
use App\Http\Requests\CommentRequest;
use App\Models\Comment_like;
use App\Models\Status;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Comment::select()
        ->orderBy('created_at', 'DESC');

    return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommentRequest $request)
    {
        $validated =[
            "comment"=>$request->comment,
            'status_id' =>$request->status_id
        ];
        $validated['user_id']= Auth::user()->id;
        $validated['reply_id']= $request->reply_id;
        if($request->reply_id=="null"){
            $validated['reply_id']= null;
            $comment = Comment::create($validated);
        }else{
            $data= Comment::where("comment_id", $request->reply_id)->first();
            Comment::where("comment_id", $request->reply_id)->update(["reply_total"=>$data->reply_total+1]);
            $comment = Comment::create($validated);
        }
        $comment= Comment::where("comment_id", $comment->id)->with('users')->first();
        return response()->json([
            'status' => "ok",
            'data' => $comment,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data= Comment::where("comment_id", $id)->first();
        return response()->json([
            'status' => "ok",
            'data' => $data
        ], 200);
    }
    public function showReply($id)
    {
        $data= Comment::where("reply_id", $id)->with('users')->withCount('likeComment')->withCOunt('likesComment')->get();
        return response()->json([
            'status' => "ok",
            'data' => $data
        ], 200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommentRequest $request, $id)
    {
        $validated = [
            "comment"=>$request->comment,
            'status_id' =>$request->status_id
        ];
        $validated['user_id']= Auth::user()->id;
        $data= Comment::where("comment_id", $id);
        $data->update($validated);
        $data= Comment::where("comment_id", $id)->with('users')->withCount('likeComment')->withCOunt('likesComment')->first();
        return response()->json([
            'status' => "ok",
            'data' => $data
        ], 201);
    }
    public function like($id)
    {
        $data=Comment_like::where('comment_id',$id)->where('user_id',Auth::user()->id)->first();
        if($data==null){
            Comment_like::create([
                'user_id'=>Auth::user()->id,
                'comment_id'=>$id
            ]);
        }else{
            Comment_like::where('comment_id',$id)->where('user_id',Auth::user()->id)->delete();
        }
        return response()->json(['status'=>"Ok"], 200);
        $data=Comment_like::where('comment_id',$id)->where('user_id',Auth::user()->id);
      
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data=Comment::where('comment_id', $id)->first();
        if($data->reply_id!=null){
            $data2=Comment::where('comment_id', $data->reply_id)->first();
            Comment::where("comment_id", $data->reply_id)->update(["reply_total"=>$data2->reply_total-1]);
        }
        Comment::where('comment_id', $id)->delete();

        return response()->noContent();
    }
}