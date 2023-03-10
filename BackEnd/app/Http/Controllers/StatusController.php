<?php

namespace App\Http\Controllers;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Http\Requests\InfoRequest;
use App\Models\Comment;
use App\Models\Status_like;
use Illuminate\Support\Facades\Auth;
use NunoMaduro\Collision\Adapters\Phpunit\State;
use DateTimeInterface;
class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \DateTimeInterface  $date
     * @return \Illuminate\Http\Response
     */
 
    protected function serializeDate(DateTimeInterface $date)
{
    return $date->format('Y-m-d H:i:s');
}
    public function index(Request $request)
    {
        $data = Status::orderBy('created_at', 'DESC')->with('users')->withCount('likes')->withCount('like')
        ->when($request->has('user_id'), function ($query) use ($request) {
            $query->where('user_id', $request->user_id);})
        ->when($request->has('search'), function ($query) use ($request) {
            $query->where('detail', 'like', '%' . $request->search . '%');})
            ->paging(7);
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
    public function store(InfoRequest $request)
    {
        $validated=[
            "detail"=>$request->detail,
        ];
        $validated['user_id']= Auth::user()->id;
        $status = Status::create($validated);
        $data= Status::where('id',$status->id)->with('users:id,name')->first();
        return response()->json([
            'status' => "ok",
            'data' => $data
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
        $data = Status::where('id',$id)->with('users:id,name')->with('comments')->withCount('likes')->withCount('like')->first();
        return response()->json([
            "status" => "ok",
            "data" => $data
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Status::where('id',$id)->with('users:id,name')->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(InfoRequest $request, $id)
    {
        $validated =[
            "detail"=>$request->detail,
        ];
        $validated['user_id']= Auth::user()->id;
        $data= Status::find($id);
        $data->update($validated);
        $data=  Status::where('id',$id)->with('users:id,name')->first();
        return response()->json($data, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Status::where('id', $id)->delete();

        return response()->noContent();
    }
    public function like($id)
    {
        $data=Status_like::where('status_id',$id)->where('user_id',Auth::user()->id)->first();
        if($data==null){
          
            Status_like::create([
                'user_id'=>Auth::user()->id,
                'status_id'=>$id
            ]);
        }else{
            Status_like::where('status_id',$id)->where('user_id',Auth::user()->id)->delete();
        }
        return response()->json(['status'=>"ADA1"], 201);
        $data=Status_like::where('status_id',$id)->where('user_id',Auth::user()->id);
      
    }
}