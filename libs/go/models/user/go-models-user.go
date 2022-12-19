package go_models_user

type User struct {
	ID        string `json:"id,omitempty" bson:"_id,omitempty"`
	Email     string `json:"email,omitempty" bson:"email,omitempty"`
	Username  string `json:"username" bson:"username,omitempty"`
	FirstName string `json:"first_name" bson:"first_name,omitempty"`
	LastName  string `json:"last_name" bson:"last_name,omitempty"`
	//Role  string `json:"role"`
	//Role float64 `json:"salary"`
	//Age    float64 `json:"age"`
}
