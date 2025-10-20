<?php

namespace App\Http\Controllers;

use App\Models\Finance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FinanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Finance::with('project');

        if ($request->has('project_id')) {
            $query->where('project_id', $request->project_id);
        }

        $finance = $query->get();

        return response()->json([
            'success' => true,
            'data' => $finance
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'type' => 'required|string|in:income,expense',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $finance = Finance::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Finance record created successfully',
            'data' => $finance->load('project')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Finance $finance)
    {
        return response()->json([
            'success' => true,
            'data' => $finance->load('project')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Finance $finance)
    {
        $validator = Validator::make($request->all(), [
            'project_id' => 'sometimes|required|exists:projects,id',
            'type' => 'sometimes|required|string|in:income,expense',
            'amount' => 'sometimes|required|numeric|min:0',
            'description' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $finance->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Finance record updated successfully',
            'data' => $finance->load('project')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Finance $finance)
    {
        $finance->delete();

        return response()->json([
            'success' => true,
            'message' => 'Finance record deleted successfully'
        ]);
    }
}
